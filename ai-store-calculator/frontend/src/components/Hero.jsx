import React from 'react';
import { Sparkles, Shield, Zap } from 'lucide-react';

export default function Hero() {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gold rounded-full blur-3xl float-animation" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-secondary">AI-Powered Dental Store</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent via-emerald to-gold bg-clip-text text-transparent">
          Premium Dental Care,
          <br />
          Delivered to Your Door
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-secondary mb-8 max-w-3xl mx-auto">
          Professional-grade products, expert recommendations, and smart subscriptions
          to keep your smile brilliant.
        </p>

        {/* Features */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald" />
            <span className="text-sm font-medium">Dentist Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-gold" />
            <span className="text-sm font-medium">Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium">Smart Recommendations</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={scrollToProducts}
          className="gradient-btn px-8 py-4 rounded-2xl text-white font-semibold text-lg shadow-2xl"
        >
          Shop Premium Products
        </button>

        {/* Trust Badge */}
        <p className="mt-6 text-sm text-secondary">
          ✓ Free shipping over $250 • ✓ Subscribe & save 10% • ✓ 30-day money-back guarantee
        </p>
      </div>
    </div>
  );
}
