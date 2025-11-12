import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Cart State
  cart: [],
  cartOpen: false,

  // Products State
  products: [],
  categories: [],

  // Checkout State
  checkoutLoading: false,

  // Upsells State
  upsells: [],

  // Add to cart
  addToCart: (product, isSubscription = false) => {
    const { cart } = get();
    const existingItem = cart.find(
      item => item.id === product.id && item.isSubscription === isSubscription
    );

    if (existingItem) {
      set({
        cart: cart.map(item =>
          item.id === product.id && item.isSubscription === isSubscription
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      });
    } else {
      set({
        cart: [...cart, {
          ...product,
          quantity: 1,
          isSubscription,
          price: isSubscription && product.recurringPrice ? product.recurringPrice : product.price
        }]
      });
    }

    // Update upsells based on new cart
    get().updateUpsells();
  },

  // Remove from cart
  removeFromCart: (productId, isSubscription) => {
    set({
      cart: get().cart.filter(
        item => !(item.id === productId && item.isSubscription === isSubscription)
      )
    });
    get().updateUpsells();
  },

  // Update quantity
  updateQuantity: (productId, isSubscription, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(productId, isSubscription);
    } else {
      set({
        cart: get().cart.map(item =>
          item.id === productId && item.isSubscription === isSubscription
            ? { ...item, quantity }
            : item
        )
      });
    }
  },

  // Clear cart
  clearCart: () => set({ cart: [], upsells: [] }),

  // Toggle cart drawer
  toggleCart: () => set({ cartOpen: !get().cartOpen }),
  setCartOpen: (open) => set({ cartOpen: open }),

  // Get cart totals
  getCartTotals: () => {
    const { cart } = get();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const hasSubscription = cart.some(item => item.isSubscription);
    const subscriptionDiscount = hasSubscription ? subtotal * 0.1 : 0;
    const shipping = subtotal > 250 ? 0 : 9.99;
    const total = subtotal - subscriptionDiscount + shipping;

    return {
      subtotal,
      subscriptionDiscount,
      shipping,
      total,
      hasSubscription,
      freeShipping: subtotal > 250
    };
  },

  // Load products
  loadProducts: (productsData) => {
    set({
      products: productsData.categories.flatMap(cat =>
        cat.products.map(p => ({ ...p, category: cat.id, categoryName: cat.name }))
      ),
      categories: productsData.categories
    });
  },

  // Update upsells based on cart content
  updateUpsells: () => {
    const { cart, products } = get();
    const upsellProducts = new Set();

    cart.forEach(item => {
      if (item.upsells) {
        item.upsells.forEach(upsellId => {
          // Only suggest if not already in cart
          if (!cart.find(cartItem => cartItem.id === upsellId)) {
            upsellProducts.add(upsellId);
          }
        });
      }
    });

    const upsells = Array.from(upsellProducts)
      .map(id => products.find(p => p.id === id))
      .filter(Boolean)
      .slice(0, 3); // Limit to 3 upsells

    set({ upsells });
  }
}));

export default useStore;
