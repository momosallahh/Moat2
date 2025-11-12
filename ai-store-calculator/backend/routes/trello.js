import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Load config
const configPath = join(__dirname, '../../config.json');
let config = {};
try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
  console.error('Failed to load config.json:', error);
}

// Trello API base URL
const TRELLO_API_BASE = 'https://api.trello.com/1';

// Helper function to make Trello API calls
async function trelloRequest(method, endpoint, data = {}) {
  const url = `${TRELLO_API_BASE}${endpoint}`;
  const params = {
    key: process.env.TRELLO_API_KEY,
    token: process.env.TRELLO_TOKEN,
    ...data
  };

  try {
    const response = await axios({ method, url, params: method === 'GET' ? params : undefined, data: method !== 'GET' ? params : undefined });
    return response.data;
  } catch (error) {
    throw new Error(`Trello API error: ${error.message}`);
  }
}

// Create order card
router.post('/order', async (req, res) => {
  try {
    const { orderId, customerName, customerEmail, customerPhone, items, total, paymentStatus, receiptUrl } = req.body;

    // Check if Trello is enabled
    if (!process.env.TRELLO_API_KEY || !process.env.ENABLE_TRELLO || process.env.ENABLE_TRELLO === 'false') {
      console.log('[Trello Mock] Would create card for order:', orderId);
      return res.json({
        success: true,
        message: 'Trello logging is disabled (mock mode)',
        mock: true
      });
    }

    // Format items list
    const itemsList = items.map(item =>
      `- ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}${item.isSubscription ? ' (Subscription)' : ''}`
    ).join('\n');

    // Fill template
    const template = config.trello?.cardTemplate || {};
    const title = template.title
      ?.replace('{{orderId}}', orderId)
      ?.replace('{{customerName}}', customerName)
      || `Order #${orderId} - ${customerName}`;

    const description = template.description
      ?.replace('{{customerName}}', customerName)
      ?.replace('{{customerEmail}}', customerEmail)
      ?.replace('{{customerPhone}}', customerPhone || 'N/A')
      ?.replace('{{items}}', itemsList)
      ?.replace('{{total}}', total.toFixed(2))
      ?.replace('{{paymentStatus}}', paymentStatus)
      ?.replace('{{receiptUrl}}', receiptUrl || 'N/A')
      ?.replace('{{orderDate}}', new Date().toISOString())
      || `Order details:\n${itemsList}\n\nTotal: $${total.toFixed(2)}`;

    // Get board lists
    const boardId = process.env.TRELLO_BOARD_ID;
    if (!boardId) {
      throw new Error('TRELLO_BOARD_ID not configured');
    }

    const lists = await trelloRequest('GET', `/boards/${boardId}/lists`);
    const newOrdersList = lists.find(list =>
      list.name === (config.trello?.lists?.newOrders || 'New Orders')
    );

    if (!newOrdersList) {
      throw new Error('New Orders list not found on Trello board');
    }

    // Create card
    const card = await trelloRequest('POST', '/cards', {
      name: title,
      desc: description,
      idList: newOrdersList.id,
      pos: 'top'
    });

    // Add labels if configured
    const labels = config.trello?.labels || {};
    const hasSubscription = items.some(item => item.isSubscription);
    const isHighValue = total > 250;

    const labelColors = [];
    if (hasSubscription && labels.subscription) labelColors.push('green');
    if (!hasSubscription && labels.oneTime) labelColors.push('blue');
    if (isHighValue && labels.highValue) labelColors.push('yellow');

    for (const color of labelColors) {
      try {
        await trelloRequest('POST', `/cards/${card.id}/labels`, { color });
      } catch (error) {
        console.error('Failed to add label:', error);
      }
    }

    console.log('[Trello] Card created:', card.shortUrl);

    res.json({
      success: true,
      cardId: card.id,
      cardUrl: card.shortUrl
    });
  } catch (error) {
    console.error('Trello order creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add comment to card
router.post('/comment', async (req, res) => {
  try {
    const { cardId, comment } = req.body;

    if (!process.env.TRELLO_API_KEY || !process.env.ENABLE_TRELLO || process.env.ENABLE_TRELLO === 'false') {
      console.log('[Trello Mock] Would add comment to card:', cardId);
      return res.json({ success: true, mock: true });
    }

    await trelloRequest('POST', `/cards/${cardId}/actions/comments`, {
      text: comment
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Trello comment error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Move card to different list
router.post('/move', async (req, res) => {
  try {
    const { cardId, listName } = req.body;

    if (!process.env.TRELLO_API_KEY || !process.env.ENABLE_TRELLO || process.env.ENABLE_TRELLO === 'false') {
      console.log('[Trello Mock] Would move card:', cardId, 'to', listName);
      return res.json({ success: true, mock: true });
    }

    const boardId = process.env.TRELLO_BOARD_ID;
    const lists = await trelloRequest('GET', `/boards/${boardId}/lists`);
    const targetList = lists.find(list => list.name === listName);

    if (!targetList) {
      throw new Error(`List "${listName}" not found`);
    }

    await trelloRequest('PUT', `/cards/${cardId}`, {
      idList: targetList.id
    });

    res.json({ success: true, newList: listName });
  } catch (error) {
    console.error('Trello move error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get board info
router.get('/board', async (req, res) => {
  try {
    if (!process.env.TRELLO_API_KEY) {
      return res.json({ configured: false });
    }

    const boardId = process.env.TRELLO_BOARD_ID;
    const board = await trelloRequest('GET', `/boards/${boardId}`);
    const lists = await trelloRequest('GET', `/boards/${boardId}/lists`);

    res.json({
      configured: true,
      board: {
        id: board.id,
        name: board.name,
        url: board.url
      },
      lists: lists.map(list => ({ id: list.id, name: list.name }))
    });
  } catch (error) {
    console.error('Trello board info error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
