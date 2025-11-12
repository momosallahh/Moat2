import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Load products from JSON file
const productsPath = join(__dirname, '../../products.json');
let productsData = {};

try {
  productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
} catch (error) {
  console.error('Failed to load products.json:', error);
}

// Get all products
router.get('/', (req, res) => {
  res.json(productsData);
});

// Get product by ID
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  let product = null;

  for (const category of productsData.categories || []) {
    product = category.products.find(p => p.id === productId);
    if (product) {
      product = { ...product, categoryId: category.id, categoryName: category.name };
      break;
    }
  }

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Get products by category
router.get('/category/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  const category = productsData.categories?.find(c => c.id === categoryId);

  if (category) {
    res.json({
      id: category.id,
      name: category.name,
      icon: category.icon,
      products: category.products
    });
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

// Get upsell recommendations
router.post('/upsells', (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.json({ upsells: [] });
  }

  const upsellProducts = new Set();
  const cartProductIds = new Set(cartItems.map(item => item.id));

  // Apply upsell rules
  for (const item of cartItems) {
    // Find product in catalog
    let product = null;
    for (const category of productsData.categories || []) {
      product = category.products.find(p => p.id === item.id);
      if (product) break;
    }

    // Add upsells if defined
    if (product && product.upsells) {
      product.upsells.forEach(upsellId => {
        if (!cartProductIds.has(upsellId)) {
          upsellProducts.add(upsellId);
        }
      });
    }
  }

  // Get full product details for upsells
  const upsells = Array.from(upsellProducts)
    .map(id => {
      for (const category of productsData.categories || []) {
        const product = category.products.find(p => p.id === id);
        if (product) return { ...product, categoryId: category.id };
      }
      return null;
    })
    .filter(Boolean)
    .slice(0, 3); // Limit to 3 upsells

  res.json({ upsells });
});

export default router;
