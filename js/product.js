// T-Fa Product Page Functionality

// Product data
const products = {
  hat: {
    id: 'hat',
    name: 'The Hat — The Beginning',
    price: 295,
    description: 'The iconic piece where it all began. A father\'s hat placed on his daughter\'s head became the symbol of T-Fa\'s journey.',
    fullDescription: 'Crafted from premium wool felt with a handcrafted silk band, The Hat represents the moment that sparked a legacy. This is not just a hat — it\'s a memory, a promise, a beginning. Each piece is carefully constructed to honor that sacred moment when love transcended presence.',
    images: [
      'images/hat-main.jpg',
      'images/hat-detail-1.jpg',
      'images/hat-detail-2.jpg',
      'images/hat-lifestyle.jpg'
    ],
    sizes: ['S', 'M', 'L'],
    materials: 'Premium wool felt, silk grosgrain band',
    care: 'Spot clean only. Store in dust bag.',
    story: 'She was only a few months old when her father placed his hat on her head before leaving home. That moment became the soul of T-Fa.',
    matchesWith: ['bodysuit', 'two-in-one']
  },
  bodysuit: {
    id: 'bodysuit',
    name: 'The Bodysuit — The Rebirth',
    price: 495,
    description: 'Transformation embodied in fabric. The Bodysuit represents the journey from loss to healing, from darkness to light.',
    fullDescription: 'Sculpted from Italian stretch jersey, The Bodysuit is a second skin that honors the body\'s journey through grief and rebirth. The architectural cut creates a silhouette that is both powerful and vulnerable, strong yet tender. This is the piece that holds you as you transform.',
    images: [
      'images/bodysuit-main.jpg',
      'images/bodysuit-detail-1.jpg',
      'images/bodysuit-back.jpg',
      'images/bodysuit-lifestyle.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    materials: 'Italian stretch jersey, invisible zipper closure',
    care: 'Hand wash cold. Lay flat to dry.',
    story: 'The cocoon of transformation. This piece represents the metamorphosis from grief to strength, embodying rebirth.',
    matchesWith: ['hat', 'two-in-one']
  },
  'two-in-one': {
    id: 'two-in-one',
    name: 'Two-in-One Pants & Skirt — The Unity',
    price: 595,
    description: 'Duality and unity in one transformative piece. Wear as tailored pants or flowing skirt — the choice defines your story.',
    fullDescription: 'Innovative design meets emotional storytelling. The Two-in-One features a revolutionary construction that transforms from structured pants to an elegant skirt with a simple adjustment. Created from luxurious Italian wool suiting with hidden silk panels, this piece represents the duality within us all — strength and grace, tradition and innovation, past and future unified.',
    images: [
      'images/two-in-one-pants.jpg',
      'images/two-in-one-skirt.jpg',
      'images/two-in-one-detail.jpg',
      'images/two-in-one-lifestyle.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    materials: 'Italian wool suiting, silk charmeuse panels',
    care: 'Dry clean only.',
    story: 'The merging of opposites. This piece represents unity — of past and present, of T and F and a, of all that was and all that will be.',
    matchesWith: ['hat', 'bodysuit']
  }
};

// Initialize product page
document.addEventListener('DOMContentLoaded', function() {
  initializeProductPage();
});

function initializeProductPage() {
  // Get product ID from page
  const productId = document.body.dataset.productId;

  if (!productId || !products[productId]) return;

  const product = products[productId];

  // Initialize image gallery
  initializeImageGallery();

  // Initialize size selector
  initializeSizeSelector();

  // Initialize quantity selector
  initializeQuantitySelector();

  // Initialize add to cart
  initializeAddToCart(product);

  // Suggest complete look via AI
  if (window.AIStylist) {
    setTimeout(() => {
      window.AIStylist.suggestCompleteLook(productId);
    }, 3000);
  }
}

function initializeImageGallery() {
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.querySelector('.main-product-image');

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', function() {
      // Remove active class from all thumbnails
      thumbnails.forEach(t => t.classList.remove('active'));

      // Add active class to clicked thumbnail
      this.classList.add('active');

      // Update main image
      mainImage.src = this.src.replace('-thumb', '');

      // Animate image change
      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.style.opacity = '1';
      }, 150);
    });
  });

  // Set first thumbnail as active
  if (thumbnails.length > 0) {
    thumbnails[0].classList.add('active');
  }
}

function initializeSizeSelector() {
  const sizeOptions = document.querySelectorAll('.size-option');

  sizeOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remove selected class from all options
      sizeOptions.forEach(opt => opt.classList.remove('selected'));

      // Add selected class to clicked option
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
        image: product.images[0]
      };

      // Use the addToCart function from main.js
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

  // Add column headers based on measurements
  const firstItem = guide.measurements[0];
  Object.keys(firstItem).forEach(key => {
    if (key !== 'size') {
      tableHTML += `<th style="padding: 1rem; text-align: left;">${key.charAt(0).toUpperCase() + key.slice(1)}</th>`;
    }
  });

  tableHTML += `</tr></thead><tbody>`;

  // Add rows
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
  products: products,
  renderSizeGuide: renderSizeGuide
};
