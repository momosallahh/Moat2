import React, { useState } from 'react';
import { ShoppingCart, Info, X, Check, RefreshCw } from 'lucide-react';
import useStore from '../utils/store';

export default function ProductCard({ product }) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedType, setSelectedType] = useState('one-time');
  const addToCart = useStore(state => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product, selectedType === 'subscription');
    // Visual feedback
    const button = document.getElementById(`add-btn-${product.id}`);
    button?.classList.add('scale-95');
    setTimeout(() => button?.classList.remove('scale-95'), 200);
  };

  const displayPrice = selectedType === 'subscription' && product.recurringPrice
    ? product.recurringPrice
    : product.price;

  const showSubscriptionOption = product.type === 'subscription' || product.type === 'both';

  return (
    <>
      {/* Product Card */}
      <div className="glass glass-hover rounded-2xl overflow-hidden group">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/10 to-emerald/10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {showSubscriptionOption && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald text-white text-xs font-semibold">
              Subscribe & Save
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{product.name}</h3>
          <p className="text-sm text-secondary mb-4 line-clamp-2">{product.description}</p>

          {/* Price */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-emerald">${displayPrice}</span>
              {selectedType === 'subscription' && product.price !== product.recurringPrice && (
                <span className="text-sm text-secondary line-through">${product.price}</span>
              )}
            </div>
            {selectedType === 'subscription' && (
              <span className="text-xs text-secondary">per {product.interval}</span>
            )}
          </div>

          {/* Type Selector */}
          {showSubscriptionOption && (
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setSelectedType('one-time')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedType === 'one-time'
                    ? 'bg-accent text-white'
                    : 'glass text-secondary hover:text-white'
                }`}
              >
                One-Time
              </button>
              <button
                onClick={() => setSelectedType('subscription')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedType === 'subscription'
                    ? 'bg-emerald text-white'
                    : 'glass text-secondary hover:text-white'
                }`}
              >
                <RefreshCw className="w-3 h-3 inline mr-1" />
                Subscribe
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              id={`add-btn-${product.id}`}
              onClick={handleAddToCart}
              className="flex-1 gradient-btn px-4 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <button
              onClick={() => setShowDetails(true)}
              className="glass glass-hover px-4 py-3 rounded-xl"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 glass border-b border-white/10 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 glass-hover rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-2xl mb-6"
              />

              {/* Description */}
              <p className="text-secondary mb-6">{product.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                      <span className="text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Add */}
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-emerald">${displayPrice}</div>
                    {selectedType === 'subscription' && (
                      <span className="text-sm text-secondary">per {product.interval}</span>
                    )}
                  </div>
                  {showSubscriptionOption && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedType('one-time')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          selectedType === 'one-time'
                            ? 'bg-accent text-white'
                            : 'glass text-secondary'
                        }`}
                      >
                        One-Time
                      </button>
                      <button
                        onClick={() => setSelectedType('subscription')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          selectedType === 'subscription'
                            ? 'bg-emerald text-white'
                            : 'glass text-secondary'
                        }`}
                      >
                        Subscribe
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    handleAddToCart();
                    setShowDetails(false);
                  }}
                  className="w-full gradient-btn px-6 py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
