import React from 'react';
import useStore from '../utils/store';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const categories = useStore(state => state.categories);

  return (
    <div id="products" className="max-w-7xl mx-auto px-6 py-16">
      {categories.map((category) => (
        <div key={category.id} className="mb-16">
          {/* Category Header */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h2 className="text-3xl font-bold">{category.name}</h2>
              <p className="text-secondary">Premium dental products for your perfect smile</p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
