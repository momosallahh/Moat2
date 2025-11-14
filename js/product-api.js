// T-Fa Product Page Functionality with API Integration

// API Configuration
const API_BASE_URL = 'http://localhost:3001/api'; // Change this to your deployed backend URL

// Product data cache
let productsCache = null;

// Fetch all products from API
async function fetchProducts() {
  if (productsCache) return productsCache;

  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');

    productsCache = await response.json();
    return productsCache;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to local data if API fails
    return getFallbackProducts();
  }
}

// Fetch single product from API
async function fetchProduct(productId) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (!response.ok) throw new Error('Product not found');

    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    // Fallback to local data
    const products = getFallbackProducts();
    return products.find(p => p.id === productId);
  }
}

// Fallback products (in case API is not available)
function getFallbackProducts() {
  return [
    {
      id: 'hat',
      name: 'The Hat — The Beginning',
      price: 295,
      description: 'The iconic piece where it all began.',
      fullDescription: 'Crafted from premium wool felt with a handcrafted silk band, The Hat represents the moment that sparked a legacy.',
      images: ['hat-main.jpg', 'hat-detail-1.jpg', 'hat-detail-2.jpg', 'hat-lifestyle.jpg'],
      sizes: ['S', 'M', 'L'],
      materials: 'Premium wool felt, silk grosgrain band',
      care: 'Spot clean only. Store in dust bag.',
      story: 'She was only a few months old when her father placed his hat on her head before leaving home.',
      matchesWith: ['bodysuit', 'two-in-one']
    },
    {
      id: 'bodysuit',
      name: 'The Bodysuit — The Rebirth',
      price: 495,
      description: 'Transformation embodied in fabric.',
      fullDescription: 'Sculpted from Italian stretch jersey, The Bodysuit is a second skin that honors the body\'s journey.',
      images: ['bodysuit-main.jpg', 'bodysuit-detail-1.jpg', 'bodysuit-back.jpg', 'bodysuit-lifestyle.jpg'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      materials: 'Italian stretch jersey, invisible zipper closure',
      care: 'Hand wash cold. Lay flat to dry.',
      story: 'The cocoon of transformation. This piece represents the metamorphosis from grief to strength.',
      matchesWith: ['hat', 'two-in-one']
    },
    {
      id: 'two-in-one',
      name: 'Two-in-One Pants & Skirt — The Unity',
      price: 595,
      description: 'Duality and unity in one transformative piece.',
      fullDescription: 'Innovative design meets emotional storytelling. Created from luxurious Italian wool suiting.',
      images: ['two-in-one-pants.jpg', 'two-in-one-skirt.jpg', 'two-in-one-detail.jpg', 'two-in-one-lifestyle.jpg'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      materials: 'Italian wool suiting, silk charmeuse panels',
      care: 'Dry clean only.',
      story: 'The merging of opposites. This piece represents unity.',
      matchesWith: ['hat', 'bodysuit']
    }
  ];
}

// Initialize product page
document.addEventListener('DOMContentLoaded', async function() {
  const productId = document.body.dataset.productId;

  if (productId) {
    await initializeProductPage(productId);
  } else {
    // We're on shop page, load all products
    await initializeShopPage();
  }
});

async function initializeProductPage(productId) {
  const product = await fetchProduct(productId);

  if (!product) {
    console.error('Product not found');
    return;
  }

  // Initialize image gallery
  initializeImageGallery();

  // Initialize size selector
  initializeSizeSelector();

  // Initialize quantity selector
  initializeQuantitySelector();

  // Initialize add to cart with current product data
  initializeAddToCart(product);

  // Suggest complete look via AI
  if (window.AIStylist) {
    setTimeout(() => {
      window.AIStylist.suggestCompleteLook(productId);
    }, 3000);
  }
}

async function initializeShopPage() {
  const productsContainer = document.querySelector('.product-grid');
  if (!productsContainer) return;

  const products = await fetchProducts();

  // Update product cards with real data
  productsContainer.innerHTML = '';

  products.forEach(product => {
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.onclick = () => window.location.href = `product-${product.id}.html`;

  // Use gradient placeholder if no image
  const imageStyle = product.images && product.images.length > 0
    ? `background-image: url('${API_BASE_URL.replace('/api', '')}/uploads/${product.images[0]}');`
    : `background: linear-gradient(135deg, #EDE5D9 0%, #D7A86E 100%);`;

  card.innerHTML = `
    <div class="product-image-wrapper">
      <div class="product-image" style="${imageStyle} background-size: cover; display: flex; align-items: center; justify-content: center;">
        ${!product.images || product.images.length === 0 ? '🎨' : ''}
      </div>
      <div class="product-overlay">
        <button class="quick-view-btn">View Details</button>
      </div>
    </div>
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <p class="product-price">$${product.price}</p>
    </div>
  `;

  return card;
}

function initializeImageGallery() {
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.querySelector('.main-product-image');

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', function() {
      thumbnails.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      mainImage.src = this.src.replace('-thumb', '');
      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.style.opacity = '1';
      }, 150);
    });
  });

  if (thumbnails.length > 0) {
    thumbnails[0].classList.add('active');
  }
}

function initializeSizeSelector() {
  const sizeOptions = document.querySelectorAll('.size-option');

  sizeOptions.forEach(option => {
    option.addEventListener('click', function() {
      sizeOptions.forEach(opt => opt.classList.remove('selected'));
      this.classList.add('selected');
    });
  });
}

function initializeQuantitySelector() {
  const decreaseBtn = document.querySelector('.quantity-btn.decrease');
  const increaseBtn = document.querySelector('.quantity-btn.increase');
  const quantityDisplay = document.querySelector('.quantity-display');

  let quantity = 1;

  if (decreaseBtn) {
    decreaseBtn.addEventListener('click', function() {
      if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
      }
    });
  }

  if (increaseBtn) {
    increaseBtn.addEventListener('click', function() {
      if (quantity < 10) {
        quantity++;
        quantityDisplay.textContent = quantity;
      }
    });
  }
}

function initializeAddToCart(product) {
  const addToCartBtn = document.querySelector('.add-to-cart-btn');

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      const selectedSize = document.querySelector('.size-option.selected');

      if (!selectedSize) {
        alert('Please select a size');
        return;
      }

      const quantity = parseInt(document.querySelector('.quantity-display').textContent);

      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize.dataset.size,
        quantity: quantity,
        image: product.images && product.images.length > 0
          ? `${API_BASE_URL.replace('/api', '')}/uploads/${product.images[0]}`
          : 'placeholder.jpg'
      };

      if (typeof addToCart === 'function') {
        addToCart(cartItem);
      }
    });
  }
}

// Size guide data
const sizeGuide = {
  hat: {
    title: 'Hat Size Guide',
    measurements: [
      { size: 'S', measurement: '21.5" - 22"', cm: '54.5 - 56 cm' },
      { size: 'M', measurement: '22" - 22.5"', cm: '56 - 57 cm' },
      { size: 'L', measurement: '22.5" - 23.5"', cm: '57 - 59.5 cm' }
    ],
    howToMeasure: 'Measure around your head at the widest point, approximately 1" above your ears.'
  },
  bodysuit: {
    title: 'Bodysuit Size Guide',
    measurements: [
      { size: 'XS', bust: '32"', waist: '24"', hips: '34"' },
      { size: 'S', bust: '34"', waist: '26"', hips: '36"' },
      { size: 'M', bust: '36"', waist: '28"', hips: '38"' },
      { size: 'L', bust: '38"', waist: '30"', hips: '40"' },
      { size: 'XL', bust: '40"', waist: '32"', hips: '42"' }
    ],
    howToMeasure: 'Measure bust at fullest point, waist at natural waistline, and hips at fullest point.'
  },
  'two-in-one': {
    title: 'Two-in-One Size Guide',
    measurements: [
      { size: 'XS', waist: '24"', hips: '34"', inseam: '32"' },
      { size: 'S', waist: '26"', hips: '36"', inseam: '32"' },
      { size: 'M', waist: '28"', hips: '38"', inseam: '32"' },
      { size: 'L', waist: '30"', hips: '40"', inseam: '32"' },
      { size: 'XL', waist: '32"', hips: '42"', inseam: '32"' }
    ],
    howToMeasure: 'Measure waist at natural waistline, hips at fullest point, and inseam from crotch to ankle.'
  }
};

function renderSizeGuide(productId) {
  const guide = sizeGuide[productId];
  if (!guide) return '';

  let tableHTML = `
    <h3>${guide.title}</h3>
    <p style="margin-bottom: 1.5rem; color: var(--charcoal);">${guide.howToMeasure}</p>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="border-bottom: 2px solid var(--charcoal);">
          <th style="padding: 1rem; text-align: left;">Size</th>
  `;

  const firstItem = guide.measurements[0];
  Object.keys(firstItem).forEach(key => {
    if (key !== 'size') {
      tableHTML += `<th style="padding: 1rem; text-align: left;">${key.charAt(0).toUpperCase() + key.slice(1)}</th>`;
    }
  });

  tableHTML += `</tr></thead><tbody>`;

  guide.measurements.forEach(item => {
    tableHTML += `<tr style="border-bottom: 1px solid rgba(0,0,0,0.1);">
      <td style="padding: 1rem; font-weight: 600;">${item.size}</td>`;

    Object.keys(item).forEach(key => {
      if (key !== 'size') {
        tableHTML += `<td style="padding: 1rem;">${item[key]}</td>`;
      }
    });

    tableHTML += `</tr>`;
  });

  tableHTML += `</tbody></table>`;

  return tableHTML;
}

// Export for use in HTML
window.ProductPage = {
  fetchProducts: fetchProducts,
  fetchProduct: fetchProduct,
  renderSizeGuide: renderSizeGuide
};
