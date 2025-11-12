import express from 'express';
import twilio from 'twilio';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Initialize Twilio client
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

// Load config for SMS templates
const configPath = join(__dirname, '../../config.json');
let config = {};
try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
  console.error('Failed to load config.json:', error);
}

// SMS templates
const templates = config.sms?.templates || {
  ORDER_CONFIRM: "Thanks for your order with {{companyName}}! Your order #{{orderId}} is confirmed. Want to add a cleaning next week? Reply CLEAN.",
  WHITENING_UPSELL: "Keep your shade bright: add monthly gel refills for $49. Reply ADD to subscribe.",
  BRUSH_REFILL: "Heads wear out after ~90 days. Add a 4-pack auto-ship for $39? Reply ADD.",
  SUBSCRIPTION_CONFIRM: "Your {{productName}} subscription is active! Next delivery: {{nextDelivery}}. Manage anytime at {{manageUrl}}",
  APPOINTMENT_REMINDER: "Your cleaning appointment at {{companyName}} is coming up! Reply CONFIRM or call {{phone}}."
};

// Template replacement function
function fillTemplate(template, data) {
  let filled = template;
  for (const [key, value] of Object.entries(data)) {
    filled = filled.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  return filled;
}

// Send SMS
router.post('/send', async (req, res) => {
  try {
    const { to, template, data } = req.body;

    if (!to) {
      return res.status(400).json({ error: 'Phone number required' });
    }

    // Check if Twilio is enabled
    if (!twilioClient || !process.env.ENABLE_TWILIO || process.env.ENABLE_TWILIO === 'false') {
      console.log('[SMS Mock] Would send SMS to:', to);
      console.log('[SMS Mock] Template:', template);
      console.log('[SMS Mock] Data:', data);
      return res.json({
        success: true,
        message: 'SMS sending is disabled (mock mode)',
        mock: true
      });
    }

    // Get template and fill it
    const templateText = templates[template] || template;
    const message = fillTemplate(templateText, data || {});

    // Send via Twilio
    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });

    console.log('[SMS Sent]', result.sid);

    res.json({
      success: true,
      messageId: result.sid,
      to: to,
      message: message
    });
  } catch (error) {
    console.error('SMS error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Handle incoming SMS (webhooks)
router.post('/webhook', (req, res) => {
  try {
    const { From, Body } = req.body;
    const reply = Body.trim().toUpperCase();

    console.log('[SMS Received]', From, reply);

    // Handle reply commands
    const handlers = config.sms?.replyHandlers || {};
    let response = 'Thank you for your message!';

    switch (reply) {
      case 'ADD':
        response = 'Great! We\'ll add that to your account. You\'ll receive a confirmation email shortly.';
        // TODO: Create subscription in Stripe
        // TODO: Comment on Trello card
        break;

      case 'CLEAN':
        response = 'Perfect! We\'ll send you a link to book your cleaning appointment.';
        // TODO: Send booking link
        break;

      case 'CONFIRM':
        response = 'Your appointment is confirmed! See you soon.';
        // TODO: Update appointment status
        break;

      case 'STOP':
      case 'UNSUBSCRIBE':
        response = 'You\'ve been unsubscribed from SMS notifications.';
        // TODO: Update customer preferences
        break;

      default:
        response = 'Thanks for your message! Reply ADD for subscriptions, CLEAN to book, or STOP to unsubscribe.';
    }

    // Send response via TwiML
    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message(response);

    res.type('text/xml');
    res.send(twiml.toString());
  } catch (error) {
    console.error('SMS webhook error:', error);
    res.status(500).send('Error processing SMS');
  }
});

// Send bulk SMS
router.post('/bulk', async (req, res) => {
  try {
    const { recipients, template, data } = req.body;

    if (!recipients || recipients.length === 0) {
      return res.status(400).json({ error: 'Recipients required' });
    }

    const results = [];

    for (const recipient of recipients) {
      try {
        const phoneData = typeof recipient === 'string' ? { phone: recipient } : recipient;
        const mergedData = { ...data, ...phoneData };

        const templateText = templates[template] || template;
        const message = fillTemplate(templateText, mergedData);

        if (twilioClient && process.env.ENABLE_TWILIO !== 'false') {
          const result = await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneData.phone
          });

          results.push({ phone: phoneData.phone, success: true, messageId: result.sid });
        } else {
          console.log('[SMS Mock Bulk]', phoneData.phone, message);
          results.push({ phone: phoneData.phone, success: true, mock: true });
        }
      } catch (error) {
        results.push({ phone: recipient.phone || recipient, success: false, error: error.message });
      }
    }

    res.json({
      success: true,
      total: recipients.length,
      sent: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    });
  } catch (error) {
    console.error('Bulk SMS error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
