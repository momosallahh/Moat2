import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useStore from './utils/store';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import SuccessPage from './pages/SuccessPage';
import AdminPage from './pages/AdminPage';
import productsData from '../../products.json';

function App() {
  const loadProducts = useStore(state => state.loadProducts);

  useEffect(() => {
    loadProducts(productsData);
  }, [loadProducts]);

  return (
    <Router>
      <Routes>
        {/* Main Store */}
        <Route path="/" element={
          <div className="min-h-screen bg-dark">
            <Header />
            <Hero />
            <ProductGrid />
            <CartDrawer />
          </div>
        } />

        {/* Success Page */}
        <Route path="/success" element={<SuccessPage />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
