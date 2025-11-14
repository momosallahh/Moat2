# 🎉 T-Fa Backend Setup Guide

Your complete backend is ready! Here's how to use it.

---

## ⚡ Quick Start (2 Minutes)

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install:
- Express (web server)
- JWT (authentication)
- Bcrypt (password hashing)
- Multer (file uploads)
- CORS (cross-origin support)

---

### Step 2: Start the Server

```bash
npm start
```

You'll see:
```
🚀 T-Fa Backend API running on http://localhost:3001
📊 Admin Dashboard: http://localhost:3001/admin
🔐 Default Login: username: admin, password: admin123
```

---

### Step 3: Access Admin Dashboard

Open your browser:
```
http://localhost:3001/admin
```

**Login with:**
- Username: `admin`
- Password: `admin123`

---

## 🛍️ Managing Products

### Add a New Product

1. Click "**+ Add New Product**"
2. Fill in:
   - Product Name (e.g., "The Scarf — The Connection")
   - Price (e.g., 195)
   - Short Description
   - Full Description
   - Sizes (e.g., One Size, S, M, L)
   - Materials
   - Care Instructions
   - Story (the emotional meaning)
   - Category (Apparel/Accessories/Other)
   - In Stock checkbox
   - Image URLs (comma separated)

3. Click "**Save Product**"

**Done!** Your product is now live.

---

### Edit a Product

1. Find the product card
2. Click "**Edit**"
3. Make your changes
4. Click "**Save Product**"

---

### Delete a Product

1. Find the product card
2. Click "**Delete**"
3. Confirm deletion

---

## 🔗 Connect Frontend to Backend

### Option 1: Use the New API-Powered Frontend

Replace `js/product.js` with `js/product-api.js` in your HTML files:

```html
<!-- OLD -->
<script src="js/product.js"></script>

<!-- NEW -->
<script src="js/product-api.js"></script>
```

### Option 2: Update API URL

In `js/product-api.js`, change:

```javascript
const API_BASE_URL = 'http://localhost:3001/api';
```

For production deployment, change to your deployed backend URL:

```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

---

## 🌐 Deploy Your Backend

### Option 1: Render.com (Recommended - Free)

1. Go to [render.com](https://render.com)
2. Sign up / Log in
3. Click "**New +**" → "**Web Service**"
4. Connect your GitHub repository
5. **Settings:**
   - **Name:** tfa-backend
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     - `JWT_SECRET` = `your-random-secret-key-here`
6. Click "**Create Web Service**"

**Your API will be live in 2-3 minutes!**

You'll get a URL like: `https://tfa-backend.onrender.com`

---

### Option 2: Railway.app (Easy - Free)

1. Go to [railway.app](https://railway.app)
2. Sign up / Log in
3. Click "**New Project**"
4. Select "**Deploy from GitHub repo**"
5. Choose your `Moat2` repository
6. Select `backend` as the root directory
7. Add environment variable:
   - `JWT_SECRET` = `your-secret-key`
8. Deploy!

---

### Option 3: Fly.io (Advanced)

```bash
cd backend

# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Launch app
fly launch

# Deploy
fly deploy
```

---

## 🔒 Security Best Practices

### 1. Change Admin Password

After first run, update `backend/data/users.json`:

```javascript
const bcrypt = require('bcryptjs');
const newPassword = 'your-super-secure-password';
const hash = bcrypt.hashSync(newPassword, 10);
console.log(hash);
```

Copy the hash and update `users.json`.

---

### 2. Set Strong JWT Secret

In production, use a strong random secret:

```bash
# Generate a random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Set this as `JWT_SECRET` environment variable.

---

### 3. Enable HTTPS

When deployed, your hosting provider (Render/Railway) automatically provides HTTPS.

---

## 📊 API Endpoints

Your backend provides these endpoints:

### Public (No Auth)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/auth/login` - Admin login

### Protected (Requires Auth Token)
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/upload` - Upload image

---

## 🖼️ Adding Product Images

### Method 1: Image URLs

When adding a product, enter image URLs in the "Image URLs" field:
```
https://example.com/image1.jpg, https://example.com/image2.jpg
```

### Method 2: Upload to Backend (Coming Soon)

The upload endpoint is ready at `/api/upload`. You can integrate a file picker in the admin dashboard.

### Method 3: Use Image Hosting

Upload images to:
- [Cloudinary](https://cloudinary.com) (free tier)
- [Imgur](https://imgur.com)
- [ImgBB](https://imgbb.com)

Then use those URLs in your products.

---

## 🔄 Update Frontend with New Products

Once you add products in the admin dashboard:

1. **They appear immediately** in the API at:
   ```
   http://localhost:3001/api/products
   ```

2. **Update your frontend** to use `js/product-api.js`

3. **Refresh your website** - new products appear automatically!

---

## 📁 Database

Products are stored in `backend/data/products.json`:

```json
[
  {
    "id": "hat",
    "name": "The Hat — The Beginning",
    "price": 295,
    "description": "...",
    "sizes": ["S", "M", "L"],
    "inStock": true
  }
]
```

You can also edit this file directly (but use the admin dashboard for better experience).

---

## 🐛 Troubleshooting

### Port 3001 Already in Use

```bash
# Kill the process
lsof -ti:3001 | xargs kill -9

# Or use a different port
PORT=3002 npm start
```

### Can't Login to Admin

- Username: `admin`
- Password: `admin123`
- Check `backend/data/users.json` exists

### Frontend Can't Connect

- Make sure backend is running (`npm start`)
- Check API_BASE_URL in `js/product-api.js`
- Check browser console for CORS errors

---

## ✅ Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Start server (`npm start`)
- [ ] Login to admin dashboard
- [ ] Add/Edit/Delete a test product
- [ ] Update frontend to use product-api.js
- [ ] Test adding products to cart
- [ ] Deploy backend (Render/Railway)
- [ ] Update frontend with production API URL
- [ ] Change admin password
- [ ] Set JWT_SECRET environment variable

---

## 🎯 Next Steps

1. **Add your real products** via admin dashboard
2. **Upload product images** to Cloudinary/Imgur
3. **Deploy backend** to Render/Railway
4. **Update frontend** API_BASE_URL with production URL
5. **Deploy frontend** to GitHub Pages/Netlify
6. **Test end-to-end** - add products, view on site, add to cart

---

## 💡 Pro Tips

### Add More Admins

Edit `backend/data/users.json`:

```json
[
  {
    "id": 1,
    "username": "admin",
    "password": "hashed-password",
    "role": "admin"
  },
  {
    "id": 2,
    "username": "manager",
    "password": "hashed-password",
    "role": "admin"
  }
]
```

### Backup Your Data

```bash
# Backup products
cp backend/data/products.json backend/data/products.backup.json

# Restore if needed
cp backend/data/products.backup.json backend/data/products.json
```

### Test API with curl

```bash
# Get all products
curl http://localhost:3001/api/products

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

---

## 🎉 You're All Set!

Your T-Fa backend is now running with:
- ✅ Product API
- ✅ Admin dashboard
- ✅ Authentication
- ✅ Easy product management

**Admin Dashboard:** http://localhost:3001/admin

---

Questions? Check the full README in `backend/README.md`
