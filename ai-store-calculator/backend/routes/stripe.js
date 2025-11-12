import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

// Create checkout session
router.post('/create-checkout', async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in cart' });
    }

    // Separate one-time and subscription items
    const lineItems = [];
    const subscriptionItems = [];

    for (const item of items) {
      if (item.isSubscription) {
        // For subscriptions, we need to create a price first or use existing price ID
        // In production, you'd have pre-created price IDs
        subscriptionItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${item.name} (Subscription)`,
              description: `Auto-delivery every ${item.interval}`,
            },
            unit_amount: Math.round(item.price * 100),
            recurring: {
              interval: item.interval === 'monthly' ? 'month' : item.interval === 'quarterly' ? 'month' : 'year',
              interval_count: item.interval === 'quarterly' ? 3 : 1,
            },
          },
          quantity: item.quantity,
        });
      } else {
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        });
      }
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [...lineItems, ...subscriptionItems],
      mode: subscriptionItems.length > 0 ? 'subscription' : 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}?cancelled=true`,
      customer_email: req.body.email,
      metadata: {
        orderType: subscriptionItems.length > 0 ? 'subscription' : 'one-time',
        itemCount: items.length,
      },
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook handler
router.post('/webhooks', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log('Webhook event:', event.type);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Checkout completed:', session.id);

        // Here you would:
        // 1. Save order to database
        // 2. Send confirmation email
        // 3. Create Trello card
        // 4. Send SMS if enabled

        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        console.log('Invoice paid:', invoice.id);
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object;
        console.log('Subscription created:', subscription.id);
        break;

      case 'customer.subscription.deleted':
        const deletedSub = event.data.object;
        console.log('Subscription cancelled:', deletedSub.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

// Get session details
router.get('/session/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    res.json(session);
  } catch (error) {
    console.error('Session retrieval error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
