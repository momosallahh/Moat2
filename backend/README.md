# T-Fa E-Commerce Backend API

Complete backend system for T-Fa luxury fashion e-commerce with product management, authentication, and admin dashboard.

## 🚀 Features

- ✅ **RESTful API** for products
- ✅ **Admin Dashboard** with beautiful UI
- ✅ **Authentication** (JWT-based)
- ✅ **Product CRUD** (Create, Read, Update, Delete)
- ✅ **Image Upload** support
- ✅ **JSON Database** (simple, no setup needed)
- ✅ **CORS enabled** for frontend integration

---

## 📦 Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The API will run on **http://localhost:3001**

---

## 🔐 Default Admin Login

**Username:** `admin`
**Password:** `admin123`

**⚠️ IMPORTANT:** Change these credentials in production!

---

## 📊 Admin Dashboard

Once the server is running, access the admin dashboard at:

```
http://localhost:3001/admin
```

### Admin Features:
- View all products
- Add new products
- Edit existing products
- Delete products
- Upload product images (coming soon)
- Manage inventory status

---

## 🛠️ API Endpoints

### Public Endpoints (No Auth Required)

#### Get All Products
```
GET /api/products
```

**Response:**
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

#### Get Single Product
```
GET /api/products/:id
```

---

### Protected Endpoints (Require Auth Token)

#### Login
```
POST /api/auth/login
```

**Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

#### Create Product
```
POST /api/products
Headers: Authorization: Bearer {token}
```

**Body:**
```json
{
  "name": "New Product",
  "price": 299,
  "description": "Product description",
  "sizes": ["S", "M", "L"],
  "materials": "Premium materials",
  "inStock": true
}
```

#### Update Product
```
PUT /api/products/:id
Headers: Authorization: Bearer {token}
```

#### Delete Product
```
DELETE /api/products/:id
Headers: Authorization: Bearer {token}
```

#### Upload Image
```
POST /api/upload
Headers: Authorization: Bearer {token}
Content-Type: multipart/form-data
```

---

## 📁 Project Structure

```
backend/
├── server.js           # Main server file
├── package.json        # Dependencies
├── data/
│   ├── products.json   # Product database
│   └── users.json      # User database
├── uploads/            # Uploaded images
└── public/
    └── index.html      # Admin dashboard
```

---

## 🔒 Security

### JWT Authentication
- All admin operations require JWT token
- Tokens expire after 24 hours
- Passwords are hashed with bcrypt

### Change Admin Password

Edit `backend/data/users.json` after first run, or use this script:

```javascript
const bcrypt = require('bcryptjs');
const newPassword = 'your-new-password';
const hash = bcrypt.hashSync(newPassword, 10);
console.log(hash); // Use this in users.json
```

---

## 🌐 Connecting Frontend

Update the API base URL in your frontend code:

### In `js/product-api.js`:

```javascript
const API_BASE_URL = 'http://localhost:3001/api';
```

For production, change to your deployed backend URL:

```javascript
const API_BASE_URL = 'https://your-backend.com/api';
```

---

## 🚀 Deployment

### Deploy to Render.com (Free)

1. **Create account** at [render.com](https://render.com)

2. **Connect your GitHub repo**

3. **Create New Web Service**
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables:
     - `JWT_SECRET`: your-secret-key
     - `PORT`: 3001

4. **Deploy!**

Your API will be live at: `https://your-app.onrender.com`

---

### Deploy to Railway.app (Free)

1. **Create account** at [railway.app](https://railway.app)

2. **New Project** → Deploy from GitHub

3. **Select your repo** and `backend` folder

4. **Add environment variables:**
   - `JWT_SECRET`: your-secret-key

5. **Deploy!**

---

### Deploy to Heroku

```bash
cd backend

# Create Heroku app
heroku create tfa-backend

# Set environment variables
heroku config:set JWT_SECRET=your-secret-key

# Deploy
git push heroku main
```

---

## 🔧 Environment Variables

Create a `.env` file in the backend folder:

```env
PORT=3001
JWT_SECRET=change-this-to-a-random-secret-key
NODE_ENV=production
```

Update `server.js` to use environment variables:

```javascript
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
```

---

## 📝 Database

Currently using JSON files for simplicity. Data is stored in:

- `data/products.json` - Products
- `data/users.json` - Admin users

### Upgrade to Real Database (Optional)

For production, consider upgrading to:
- **MongoDB** (via MongoDB Atlas - free tier)
- **PostgreSQL** (via Supabase - free tier)
- **MySQL**

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### CORS Errors
Make sure CORS is enabled in `server.js`:
```javascript
app.use(cors());
```

### Can't Login to Admin
- Check default credentials: admin / admin123
- Check `data/users.json` exists
- Verify JWT_SECRET is set

---

## 📚 Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **CORS** - Cross-origin requests

---

## 🔄 Update Products

### Via Admin Dashboard
1. Go to http://localhost:3001/admin
2. Login
3. Click "Add New Product"
4. Fill in details
5. Save

### Via API
Use Postman or curl:

```bash
curl -X POST http://localhost:3001/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Hat",
    "price": 350,
    "description": "Beautiful new design",
    "sizes": ["S", "M", "L"]
  }'
```

---

## ✅ Next Steps

1. ✅ Backend is running
2. Update frontend to use API (change API_BASE_URL)
3. Deploy backend to Render/Railway
4. Update frontend with production API URL
5. Add real product images
6. Change admin password

---

## 💡 Support

For issues or questions:
- Check the logs: `npm start`
- Verify port 3001 is available
- Check data files exist in `data/` folder

---

**Your T-Fa backend is ready! 🎉**

Access admin dashboard: **http://localhost:3001/admin**
