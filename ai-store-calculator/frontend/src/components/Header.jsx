import React from 'react';
import { ShoppingCart } from 'lucide-react';
import useStore from '../utils/store';

export default function Header() {
  const { cart, toggleCart } = useStore();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-30 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-3xl">🦷</span>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-emerald bg-clip-text text-transparent">
                SmileStore
              </h1>
              <p className="text-xs text-secondary">Premium Dental Care</p>
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="relative glass glass-hover px-4 py-3 rounded-xl flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald text-white text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
