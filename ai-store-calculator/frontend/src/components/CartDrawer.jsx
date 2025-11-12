import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Tag, Truck, RefreshCw } from 'lucide-react';
import useStore from '../utils/store';
import axios from 'axios';

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    getCartTotals,
    upsells,
    addToCart
  } = useStore();

  const totals = getCartTotals();

  const handleCheckout = async () => {
    try {
      const response = await axios.post('/api/stripe/create-checkout', {
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          isSubscription: item.isSubscription,
          interval: item.interval
        }))
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to create checkout session. Please try again.');
    }
  };

  if (!cartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-dark border-l border-white/10 z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="glass border-b border-white/10 p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold">Your Cart</h2>
            {cart.length > 0 && (
              <span className="px-2 py-1 rounded-full bg-accent text-white text-xs font-semibold">
                {cart.length}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 glass-hover rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-secondary mb-4" />
              <p className="text-lg font-semibold mb-2">Your cart is empty</p>
              <p className="text-sm text-secondary">Add some products to get started</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              {cart.map((item) => (
                <div key={`${item.id}-${item.isSubscription}`} className="glass rounded-xl p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          {item.isSubscription && (
                            <div className="flex items-center gap-1 mt-1">
                              <RefreshCw className="w-3 h-3 text-emerald" />
                              <span className="text-xs text-emerald">
                                {item.interval} subscription
                              </span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.isSubscription)}
                          className="p-1 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.isSubscription, item.quantity - 1)}
                            className="p-1 glass-hover rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.isSubscription, item.quantity + 1)}
                            className="p-1 glass-hover rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-emerald">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upsells */}
              {upsells.length > 0 && (
                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-gold" />
                    <h3 className="font-semibold text-sm">You might also like</h3>
                  </div>
                  <div className="space-y-2">
                    {upsells.map((product) => (
                      <div key={product.id} className="glass rounded-lg p-3 flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-xs font-semibold">{product.name}</p>
                          <p className="text-xs text-emerald">${product.price}</p>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="px-3 py-1 bg-gold/20 text-gold rounded-lg text-xs font-semibold hover:bg-gold hover:text-dark transition-all"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer - Totals & Checkout */}
        {cart.length > 0 && (
          <div className="glass border-t border-white/10 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Subtotal</span>
              <span className="font-semibold">${totals.subtotal.toFixed(2)}</span>
            </div>

            {/* Subscription Discount */}
            {totals.subscriptionDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-emerald flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  Subscription Discount (10%)
                </span>
                <span className="font-semibold text-emerald">
                  -${totals.subscriptionDiscount.toFixed(2)}
                </span>
              </div>
            )}

            {/* Shipping */}
            <div className="flex justify-between text-sm">
              <span className="text-secondary flex items-center gap-1">
                <Truck className="w-3 h-3" />
                Shipping
              </span>
              {totals.freeShipping ? (
                <span className="font-semibold text-emerald">FREE</span>
              ) : (
                <span className="font-semibold">${totals.shipping.toFixed(2)}</span>
              )}
            </div>

            {/* Free Shipping Badge */}
            {totals.freeShipping && (
              <div className="glass rounded-lg p-2 text-center">
                <span className="text-xs text-emerald font-semibold">
                  🎉 You've unlocked FREE shipping!
                </span>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-4">
              <span>Total</span>
              <span className="text-emerald">${totals.total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full gradient-btn px-6 py-4 rounded-xl text-white font-semibold text-lg"
            >
              Proceed to Checkout
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 text-xs text-secondary">
              <span>🔒 Secure Checkout</span>
              <span>📦 Fast Delivery</span>
              <span>↩️ Easy Returns</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
