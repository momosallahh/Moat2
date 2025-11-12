# 🦷 AI Store Calculator - Premium Dentist Office E-Commerce

A complete production-ready web app for dental offices to sell products with AI-powered recommendations, subscriptions, SMS notifications, and automated order fulfillment.

![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![React](https://img.shields.io/badge/React-18.2-blue) ![Node](https://img.shields.io/badge/Node-18+-green)

---

## 🎯 Overview

**AI Store Calculator** is a premium e-commerce platform designed specifically for dental offices. It combines a beautiful storefront with powerful automation:

- ✨ **Premium UI**: Apple-style glassmorphic design with smooth animations
- 🛒 **Smart Cart**: Real-time totals, upsell recommendations, subscription options
- 💳 **Stripe Integration**: Secure checkout for one-time and recurring payments
- 📱 **Twilio SMS**: Order confirmations, upsells, and appointment reminders
- 📋 **Trello Logging**: Automatic order cards for fulfillment tracking
- 👨‍💼 **Admin Dashboard**: View orders, resend SMS, access Stripe/Trello directly

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** and npm
- **Stripe account** (test mode works)
- **Twilio account** (optional, mock mode available)
- **Trello account** (optional, mock mode available)

### Installation

```bash
# Clone the repository
cd ai-store-calculator

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Configuration

1. **Copy environment template:**

```bash
cp .env.example .env
```

2. **Edit `.env` with your keys:**

```env
# Required for checkout
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# Optional (enables SMS)
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+15551234567

# Optional (enables Trello logging)
TRELLO_API_KEY=your_key
TRELLO_TOKEN=your_token
TRELLO_BOARD_ID=your_board_id

# App settings
PORT=3001
FRONTEND_URL=http://localhost:5173
ENABLE_TWILIO=true
ENABLE_TRELLO=true
```

3. **Start the servers:**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

4. **Open your browser:**

```
http://localhost:5173
```

---

## 📁 Project Structure

```
ai-store-calculator/
├── frontend/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/       # UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   └── CartDrawer.jsx
│   │   ├── pages/            # Route pages
│   │   │   ├── SuccessPage.jsx
│   │   │   └── AdminPage.jsx
│   │   ├── utils/            # Utilities
│   │   │   └── store.js      # Zustand state management
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/                   # Express backend
│   ├── routes/
│   │   ├── stripe.js         # Checkout & webhooks
│   │   ├── sms.js            # Twilio SMS
│   │   ├── trello.js         # Order logging
│   │   └── products.js       # Product API
│   ├── server.js
│   └── package.json
├── products.json              # Product catalog
├── config.json                # App configuration
├── .env.example               # Environment template
└── README.md
```

---

## 🎨 Features

### 1. Product Catalog

**3 Categories with 10 Premium Products:**

- **Whitening & Cosmetic**
  - Professional Whitening Kit ($149.99)
  - Whitening Gel Refills ($49.99/month subscription)
  - Express Whitening Strips ($39.99)

- **Hygiene Essentials**
  - AI Smart Toothbrush ($199.99)
  - Replacement Brush Heads ($39.99/quarterly subscription)
  - Cordless Water Flosser ($79.99)
  - Clinical Fluoride Rinse ($24.99 or $19.99/month subscription)

- **Protection & Comfort**
  - Custom Night Guard Kit ($129.99)
  - Sensitivity Relief Paste ($34.99)
  - Professional Cleaning Voucher ($199.99)

### 2. Smart Cart

- **Real-time Totals**: Subtotal, discounts, shipping, tax
- **Subscription Discounts**: Auto-apply 10% off for subscriptions
- **Free Shipping**: Unlocks at $250+
- **Upsell Recommendations**: Intelligent product suggestions based on cart contents

**Upsell Logic:**
```javascript
- whitening-kit → whitening-refill + cleaning-bundle
- smart-brush → brush-heads + fluoride-rinse
- subscription → 10% discount applied
- cart > $250 → free shipping badge
```

### 3. Stripe Checkout

- **One-Time Payments**: Cards, Apple Pay, Google Pay
- **Subscriptions**: Monthly, quarterly, annual billing
- **Webhook Handling**: Auto-process payments, send confirmations
- **Test Mode**: Use test cards (4242 4242 4242 4242)

### 4. SMS Notifications (Twilio)

**Templates:**
- **ORDER_CONFIRM**: "Thanks for your order! Order #12345 confirmed."
- **WHITENING_UPSELL**: "Keep your shade bright: add monthly refills for $49. Reply ADD."
- **BRUSH_REFILL**: "Heads wear out after ~90 days. Add auto-ship for $39? Reply ADD."
- **SUBSCRIPTION_CONFIRM**: "Your subscription is active! Next delivery: Feb 15."

**Reply Handlers:**
- `ADD` → Creates subscription in Stripe → Comments on Trello card
- `CLEAN` → Sends booking link
- `CONFIRM` → Confirms appointment
- `STOP` → Unsubscribes from SMS

### 5. Trello Order Logging

**Automatically creates cards with:**
- Order ID, customer name, email, phone
- Line items with quantities and prices
- Total amount and payment status
- Stripe receipt link
- Labels: One-Time, Subscription, High Value ($250+)

**Card Structure:**
```
Title: Order #ABC12345 - John Doe

Description:
Customer: John Doe
Email: john@example.com
Phone: +1234567890

Items:
- Whitening Kit x1 - $149.99
- Gel Refills x1 - $44.99 (Subscription)

Total: $194.98
Payment Status: paid
Stripe Receipt: https://stripe.com/receipt/xyz
Order Date: 2024-01-15T10:30:00Z
```

### 6. Admin Dashboard

**Access:** `/admin` (password: `dental2024!`)

**Features:**
- View all orders with details
- Revenue metrics
- Resend SMS to customers
- Open Stripe customer profiles
- Open Trello cards
- Search and filter orders

---

## 🔧 API Documentation

### Backend Routes

#### **POST `/api/stripe/create-checkout`**
Create Stripe checkout session

```json
{
  "items": [
    {
      "productId": "whitening-kit",
      "name": "Professional Whitening Kit",
      "price": 149.99,
      "quantity": 1,
      "isSubscription": false
    }
  ]
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/...",
  "sessionId": "cs_test_..."
}
```

#### **POST `/api/sms/send`**
Send SMS to customer

```json
{
  "to": "+15551234567",
  "template": "ORDER_CONFIRM",
  "data": {
    "orderId": "ABC12345",
    "companyName": "SmileStore"
  }
}
```

#### **POST `/api/trello/order`**
Create Trello card for order

```json
{
  "orderId": "ABC12345",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "items": [...],
  "total": 194.98,
  "paymentStatus": "paid"
}
```

#### **GET `/api/products`**
Get all products

#### **GET `/api/products/:id`**
Get product by ID

#### **POST `/api/products/upsells`**
Get upsell recommendations

---

## 🎨 UI Design System

### Colors

```css
Background: #0B0F14 (dark matte)
Accent: #00AEEF (AI blue)
Emerald: #00E6A8 (success glow)
Gold: #EFBF45 (premium highlights)
Text Primary: #FFFFFF
Text Secondary: #A9B1BC
Glass Card: rgba(255, 255, 255, 0.05)
```

### Typography

- **Headers**: Poppins (bold, semibold)
- **Body**: Inter (regular, medium)

### Effects

- **Glass**: `background: rgba(255,255,255,0.05); backdrop-filter: blur(10px)`
- **Glow**: `box-shadow: 0 0 20px rgba(0, 174, 239, 0.3)`
- **Gradient Buttons**: `linear-gradient(135deg, #00AEEF 0%, #00E6A8 100%)`

---

## 📱 Responsive Design

- **Mobile**: < 768px - Single column, stacked layout
- **Tablet**: 768px - 1024px - 2 column grid
- **Desktop**: > 1024px - 3 column grid with sidebar

---

## 🧪 Testing

### Test Stripe Checkout

Use these test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0027 6000 3184`

### Mock Mode

If you don't have API keys, the app works in mock mode:

```env
ENABLE_TWILIO=false
ENABLE_TRELLO=false
```

This logs to console instead of actually calling APIs.

---

## 🚀 Deployment

### Vercel (Frontend)

```bash
cd frontend
vercel
```

### Render (Backend)

```bash
cd backend
# Connect to Render dashboard
# Set environment variables
# Deploy
```

### Environment Variables (Production)

Set these in your hosting platform:

```env
NODE_ENV=production
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TRELLO_API_KEY=...
TRELLO_TOKEN=...
FRONTEND_URL=https://yourdomain.com
```

---

## 🔒 Security

- ✅ API keys stored in `.env` (never committed)
- ✅ Stripe webhook signature verification
- ✅ Admin password protection
- ✅ CORS configured
- ✅ Input validation on all routes
- ✅ Rate limiting (recommended for production)

---

## 📊 Sample Order Flow

1. **Customer adds products to cart**
   - Sees real-time totals
   - Gets upsell recommendations

2. **Clicks "Proceed to Checkout"**
   - Redirects to Stripe Checkout
   - Enters payment info

3. **Payment succeeds**
   - Redirected to Success Page
   - Can request SMS confirmation
   - Can book cleaning appointment

4. **Backend processes order**
   - Creates Trello card
   - Sends SMS confirmation
   - Logs to admin dashboard

5. **Admin views order**
   - Sees all details
   - Can resend SMS
   - Opens Stripe/Trello

---

## 🛠️ Customization

### Add New Products

Edit `products.json`:

```json
{
  "id": "new-product",
  "name": "My Product",
  "description": "Description here",
  "price": 99.99,
  "image": "https://...",
  "features": ["Feature 1", "Feature 2"],
  "type": "one-time",
  "upsells": ["product-id-1"]
}
```

### Add SMS Templates

Edit `config.json`:

```json
{
  "sms": {
    "templates": {
      "MY_TEMPLATE": "Hello {{name}}, your order {{orderId}} is ready!"
    }
  }
}
```

### Change Branding

Edit `config.json`:

```json
{
  "branding": {
    "companyName": "Your Company",
    "tagline": "Your Tagline",
    "logo": "🏥"
  }
}
```

---

## 🐛 Troubleshooting

### Cart not updating?
- Check browser console for errors
- Verify Zustand store is initialized

### Checkout fails?
- Verify `STRIPE_SECRET_KEY` is set
- Check Stripe dashboard for errors
- Ensure test mode is enabled

### SMS not sending?
- Verify Twilio credentials
- Check phone number format (+1...)
- Verify `ENABLE_TWILIO=true`

### Trello card not created?
- Verify API key and token
- Check board ID is correct
- Verify "New Orders" list exists

---

## 📝 License

MIT License - feel free to use for commercial projects!

---

## 🙏 Credits

Built with:
- **React** + **Vite** - Frontend
- **Express** - Backend
- **Stripe** - Payments
- **Twilio** - SMS
- **Trello** - Order management
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Lucide React** - Icons

---

## 📞 Support

For questions or issues:
- 📧 Email: support@smilestore.com
- 💬 Discord: [Join our community](#)
- 🐛 Issues: [GitHub Issues](#)

---

**Built with ❤️ for dental offices**
