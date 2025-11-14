# T-Fa Luxury Fashion E-Commerce Website

A complete luxury fashion e-commerce website for T-Fa, featuring emotional storytelling, cinematic design, and an AI-powered fashion stylist.

## 🎨 About T-Fa

T-Fa is a luxury fashion brand born from love, loss, and rebirth. The name represents:
- **T** = The father
- **F** = The mother
- **a** = Anna, the daughter

The brand's first collection, "The Rebirth Collection," features three transformative pieces:
1. **The Hat — The Beginning** ($295)
2. **The Bodysuit — The Rebirth** ($495)
3. **Two-in-One Pants & Skirt — The Unity** ($595)

## ✨ Features

### 🛍️ E-Commerce Functionality
- Complete product catalog with detailed product pages
- Shopping cart with add/remove/update functionality
- Size selection and quantity controls
- Size guide modals
- Product upsells and recommendations
- Newsletter signup
- Custom design request form
- Contact form

### 🤖 AI Fashion Stylist
- "Anna AI" - An intelligent chat-based personal stylist
- Product recommendations
- Styling advice
- Size guidance
- Story and symbolism explanations
- Conversational interface

### 🎭 Design & User Experience
- Luxury, cinematic aesthetic inspired by Dior, Jacquemus, Fenty, Balmain
- Smooth animations and transitions
- Parallax effects
- Scroll-triggered animations
- Fully responsive design
- Mobile-optimized navigation

### 📄 Pages Included
- Homepage with hero, story, and featured products
- Shop page with full collection
- Individual product pages (3)
- Our Story page
- Custom Design page
- Contact page

## 🏗️ Project Structure

```
/
├── index.html              # Homepage
├── shop.html              # Shop page
├── product-hat.html       # Hat product page
├── product-bodysuit.html  # Bodysuit product page
├── product-two-in-one.html # Two-in-One product page
├── our-story.html         # Brand story page
├── custom-design.html     # Custom design request page
├── contact.html           # Contact page
├── css/
│   └── styles.css         # All styles (luxury design system)
├── js/
│   ├── main.js            # Core functionality & cart
│   ├── ai-stylist.js      # AI stylist chat system
│   └── product.js         # Product page interactions
└── README.md              # This file
```

## 🎨 Design System

### Color Palette
- **Black**: `#000000`
- **Charcoal**: `#111111`
- **Warm Gold**: `#D7A86E`
- **White**: `#FFFFFF`
- **Soft Beige**: `#EDE5D9`
- **Rose Tint**: `#F7E8E1`

### Typography
- **Headings**: Playfair Display, Cormorant Garamond
- **Body**: Inter, Montserrat

### Mood
Emotional, storytelling, elegant, minimal, premium, cinematic

## 🚀 Deployment Instructions

### Option 1: Deploy to Netlify (Recommended)

1. **Via Netlify Drop (Easiest)**
   - Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag and drop the entire project folder
   - Your site will be live instantly with a random URL
   - Optional: Customize the URL in site settings

2. **Via Netlify CLI**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Navigate to project directory
   cd /path/to/Moat2

   # Deploy
   netlify deploy --prod
   ```

3. **Via Git Integration**
   - Create a new repository on GitHub
   - Push this project to the repository
   - Go to [Netlify](https://netlify.com) and create a new site
   - Connect your GitHub repository
   - Deploy automatically on every push

### Option 2: Deploy to Vercel

1. **Via Vercel CLI**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Navigate to project directory
   cd /path/to/Moat2

   # Deploy
   vercel --prod
   ```

2. **Via Vercel Dashboard**
   - Go to [https://vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository or drag/drop the folder
   - Click "Deploy"

### Option 3: Deploy to GitHub Pages

1. Create a GitHub repository
2. Push this project to the repository
3. Go to Settings → Pages
4. Select branch (usually `main`) and root folder
5. Click Save
6. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 4: Local Preview

You can preview the site locally using any of these methods:

**Using Python (if installed):**
```bash
cd /path/to/Moat2
python -m http.server 8000
# Visit http://localhost:8000
```

**Using Node.js (if installed):**
```bash
# Install http-server globally
npm install -g http-server

cd /path/to/Moat2
http-server -p 8000
# Visit http://localhost:8000
```

**Using PHP (if installed):**
```bash
cd /path/to/Moat2
php -S localhost:8000
# Visit http://localhost:8000
```

## 🖼️ Image Placeholders

The site currently uses emoji-based gradient placeholders for product images. To use real images:

1. Add your images to an `images/` folder
2. Update the image paths in the HTML files:
   - Product card images
   - Product page main images
   - Product thumbnails
   - Hero backgrounds
   - About section images

Recommended image sizes:
- Product cards: 800×1000px (portrait)
- Product page main: 1200×1500px
- Thumbnails: 300×300px
- Hero backgrounds: 1920×1080px

## 🛒 E-Commerce Integration

The shopping cart currently uses localStorage for demonstration. To integrate with a real e-commerce platform:

### Option 1: Shopify Integration
- Convert to Shopify theme
- Use Shopify Buy Button
- Integrate Shopify Storefront API

### Option 2: Stripe Integration
- Add Stripe.js
- Create checkout session
- Handle payment processing

### Option 3: Other Platforms
- WooCommerce (WordPress)
- BigCommerce
- Square
- Custom backend with Stripe/PayPal

## 🤖 AI Stylist Enhancement

The AI stylist currently uses predefined responses. To enhance it:

### Option 1: OpenAI Integration
```javascript
// Replace dummy responses with OpenAI API calls
async function getAIResponse(userMessage) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${YOUR_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {role: 'system', content: 'You are Anna, T-Fa\'s personal fashion stylist...'},
        {role: 'user', content: userMessage}
      ]
    })
  });
  return response.json();
}
```

### Option 2: Custom ML Model
- Train on fashion data
- Deploy to cloud service
- Connect via API

## 📧 Form Integration

Contact and custom design forms currently use alerts. To handle submissions:

### Option 1: Netlify Forms
- Add `netlify` attribute to forms
- Forms automatically work when deployed to Netlify

### Option 2: Email Services
- Formspree
- EmailJS
- SendGrid API

### Option 3: Custom Backend
- Node.js + Express
- Firebase Functions
- AWS Lambda

## 📱 Mobile Optimization

The site is fully responsive with:
- Mobile-first design approach
- Hamburger menu for mobile
- Touch-optimized interactions
- Responsive typography
- Flexible grid layouts

## ♿ Accessibility

Features included:
- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Alt text for images (update with real images)
- Color contrast compliance

## 🔧 Customization

### Change Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
  --black: #000000;
  --warm-gold: #D7A86E;
  /* ... etc */
}
```

### Change Fonts
Update Google Fonts import in `css/styles.css`

### Add New Products
1. Create new product HTML file
2. Add product data to `js/product.js`
3. Update navigation and links

## 📦 Dependencies

This project uses NO frameworks or build tools:
- Pure HTML5
- Pure CSS3
- Vanilla JavaScript
- Google Fonts (CDN)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This is a custom build for T-Fa. All rights reserved.

## 🙏 Credits

**Design Inspiration**: Dior, Jacquemus, Fenty, Balmain
**Fonts**: Google Fonts (Playfair Display, Inter)
**Built with**: Love, code, and storytelling

## 💬 Support

For questions or customization requests, refer to the contact page or AI stylist feature.

---

**Built in a single Claude Code session** ✨

Enjoy your luxury fashion e-commerce experience!
