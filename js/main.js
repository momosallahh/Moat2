// T-Fa Luxury Fashion - Main JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeScrollAnimations();
  initializeNavigation();
  initializeMobileMenu();
  updateCartCount();
});

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  document.querySelectorAll('.section-title, .product-card, .story-item').forEach(el => {
    observer.observe(el);
  });
}

// Navigation Scroll Effect
function initializeNavigation() {
  const header = document.querySelector('header');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile Menu
function initializeMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
      });
    });
  }
}

// Update Cart Count
function updateCartCount() {
  const cart = getCart();
  const cartCount = document.querySelector('.cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCount) {
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
  }
}

// Get Cart from LocalStorage
function getCart() {
  const cart = localStorage.getItem('tfaCart');
  return cart ? JSON.parse(cart) : [];
}

// Save Cart to LocalStorage
function saveCart(cart) {
  localStorage.setItem('tfaCart', JSON.stringify(cart));
  updateCartCount();
}

// Add to Cart
function addToCart(product) {
  const cart = getCart();

  // Check if product already exists in cart
  const existingItem = cart.find(item =>
    item.id === product.id && item.size === product.size
  );

  if (existingItem) {
    existingItem.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  saveCart(cart);

  // Show confirmation
  showNotification('Added to cart!');

  // Open cart drawer
  setTimeout(() => {
    openCart();
  }, 500);
}

// Remove from Cart
function removeFromCart(productId, size) {
  let cart = getCart();
  cart = cart.filter(item => !(item.id === productId && item.size === size));
  saveCart(cart);
  renderCart();
}

// Update Cart Item Quantity
function updateCartQuantity(productId, size, quantity) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId && item.size === size);

  if (item) {
    item.quantity = parseInt(quantity);
    if (item.quantity <= 0) {
      removeFromCart(productId, size);
    } else {
      saveCart(cart);
      renderCart();
    }
  }
}

// Render Cart
function renderCart() {
  const cart = getCart();
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartEmpty = document.querySelector('.cart-empty');
  const cartFooter = document.querySelector('.cart-footer');

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '';
    if (cartEmpty) cartEmpty.style.display = 'block';
    if (cartFooter) cartFooter.style.display = 'none';
    return;
  }

  if (cartEmpty) cartEmpty.style.display = 'none';
  if (cartFooter) cartFooter.style.display = 'block';

  let cartHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p class="cart-item-size">Size: ${item.size}</p>
          <p class="cart-item-quantity">Qty: ${item.quantity}</p>
          <p class="cart-item-price">$${itemTotal.toFixed(2)}</p>
          <button class="remove-item" onclick="removeFromCart('${item.id}', '${item.size}')">Remove</button>
        </div>
      </div>
    `;
  });

  cartItemsContainer.innerHTML = cartHTML;

  // Update total
  const cartTotalAmount = document.querySelector('.cart-total-amount');
  if (cartTotalAmount) {
    cartTotalAmount.textContent = `$${total.toFixed(2)}`;
  }

  updateCartCount();
}

// Open Cart Drawer
function openCart() {
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartOverlay = document.querySelector('.cart-overlay');

  if (cartDrawer) {
    cartDrawer.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('active');
    renderCart();
  }
}

// Close Cart Drawer
function closeCart() {
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartOverlay = document.querySelector('.cart-overlay');

  if (cartDrawer) {
    cartDrawer.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('active');
  }
}

// Quick View Modal
function openQuickView(productId) {
  // In a real implementation, this would fetch product data
  // For now, we'll redirect to the product page
  window.location.href = `product-${productId}.html`;
}

// Show Notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--black);
    color: var(--white);
    padding: 1rem 2rem;
    border-radius: 4px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    z-index: 4000;
    animation: slideInRight 0.3s ease;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2000);
}

// Size Guide Modal
function openSizeGuide() {
  const modal = document.getElementById('sizeGuideModal');
  if (modal) {
    modal.classList.add('active');
  }
}

function closeSizeGuide() {
  const modal = document.getElementById('sizeGuideModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Newsletter Form
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;

  // In a real implementation, this would send to a backend
  showNotification('Thank you for subscribing!');
  e.target.reset();
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize cart on cart icon click
document.addEventListener('DOMContentLoaded', function() {
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', openCart);
  }

  const closeCartBtn = document.querySelector('.close-cart');
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeCart);
  }

  const cartOverlay = document.querySelector('.cart-overlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }

  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }

  // Close modals on overlay click
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
    }
  });
});
