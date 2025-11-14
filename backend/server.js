const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'tfa-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin', express.static(path.join(__dirname, 'public')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimeType);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Database file paths
const productsDB = path.join(__dirname, 'data', 'products.json');
const usersDB = path.join(__dirname, 'data', 'users.json');

// Initialize database files
if (!fs.existsSync(productsDB)) {
  const initialProducts = [
    {
      id: 'hat',
      name: 'The Hat — The Beginning',
      price: 295,
      description: 'The iconic piece where it all began. A father\'s hat placed on his daughter\'s head became the symbol of T-Fa\'s journey.',
      fullDescription: 'Crafted from premium wool felt with a handcrafted silk band, The Hat represents the moment that sparked a legacy. This is not just a hat — it\'s a memory, a promise, a beginning.',
      images: ['hat-main.jpg', 'hat-detail-1.jpg', 'hat-detail-2.jpg', 'hat-lifestyle.jpg'],
      sizes: ['S', 'M', 'L'],
      materials: 'Premium wool felt, silk grosgrain band',
      care: 'Spot clean only. Store in dust bag.',
      story: 'She was only a few months old when her father placed his hat on her head before leaving home. That moment became the soul of T-Fa.',
      category: 'accessories',
      inStock: true
    },
    {
      id: 'bodysuit',
      name: 'The Bodysuit — The Rebirth',
      price: 495,
      description: 'Transformation embodied in fabric. The Bodysuit represents the journey from loss to healing, from darkness to light.',
      fullDescription: 'Sculpted from Italian stretch jersey, The Bodysuit is a second skin that honors the body\'s journey through grief and rebirth.',
      images: ['bodysuit-main.jpg', 'bodysuit-detail-1.jpg', 'bodysuit-back.jpg', 'bodysuit-lifestyle.jpg'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      materials: 'Italian stretch jersey, invisible zipper closure',
      care: 'Hand wash cold. Lay flat to dry.',
      story: 'The cocoon of transformation. This piece represents the metamorphosis from grief to strength, embodying rebirth.',
      category: 'apparel',
      inStock: true
    },
    {
      id: 'two-in-one',
      name: 'Two-in-One Pants & Skirt — The Unity',
      price: 595,
      description: 'Duality and unity in one transformative piece. Wear as tailored pants or flowing skirt — the choice defines your story.',
      fullDescription: 'Innovative design meets emotional storytelling. Created from luxurious Italian wool suiting with hidden silk panels.',
      images: ['two-in-one-pants.jpg', 'two-in-one-skirt.jpg', 'two-in-one-detail.jpg', 'two-in-one-lifestyle.jpg'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      materials: 'Italian wool suiting, silk charmeuse panels',
      care: 'Dry clean only.',
      story: 'The merging of opposites. This piece represents unity — of past and present, of T and F and a.',
      category: 'apparel',
      inStock: true
    }
  ];
  fs.writeFileSync(productsDB, JSON.stringify(initialProducts, null, 2));
}

if (!fs.existsSync(usersDB)) {
  // Default admin user: username: admin, password: admin123
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  const initialUsers = [
    {
      id: 1,
      username: 'admin',
      password: hashedPassword,
      email: 'admin@t-fa.com',
      role: 'admin'
    }
  ];
  fs.writeFileSync(usersDB, JSON.stringify(initialUsers, null, 2));
}

// Helper functions
const readProducts = () => {
  const data = fs.readFileSync(productsDB, 'utf8');
  return JSON.parse(data);
};

const writeProducts = (products) => {
  fs.writeFileSync(productsDB, JSON.stringify(products, null, 2));
};

const readUsers = () => {
  const data = fs.readFileSync(usersDB, 'utf8');
  return JSON.parse(data);
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// ===== AUTH ROUTES =====

// Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// ===== PRODUCT ROUTES =====

// Get all products
app.get('/api/products', (req, res) => {
  try {
    const products = readProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  try {
    const products = readProducts();
    const product = products.find(p => p.id === req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create product (protected)
app.post('/api/products', authenticateToken, (req, res) => {
  try {
    const products = readProducts();
    const newProduct = {
      id: req.body.id || Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };

    products.push(newProduct);
    writeProducts(products);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product (protected)
app.put('/api/products/:id', authenticateToken, (req, res) => {
  try {
    const products = readProducts();
    const index = products.findIndex(p => p.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    products[index] = {
      ...products[index],
      ...req.body,
      id: req.params.id,
      updatedAt: new Date().toISOString()
    };

    writeProducts(products);
    res.json(products[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product (protected)
app.delete('/api/products/:id', authenticateToken, (req, res) => {
  try {
    const products = readProducts();
    const filteredProducts = products.filter(p => p.id !== req.params.id);

    if (products.length === filteredProducts.length) {
      return res.status(404).json({ error: 'Product not found' });
    }

    writeProducts(filteredProducts);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload image
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl, filename: req.file.filename });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'T-Fa Backend API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 T-Fa Backend API running on http://localhost:${PORT}`);
  console.log(`📊 Admin Dashboard: http://localhost:${PORT}/admin`);
  console.log(`🔐 Default Login: username: admin, password: admin123\n`);
});
