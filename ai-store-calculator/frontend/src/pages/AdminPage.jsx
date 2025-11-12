import React, { useState, useEffect } from 'react';
import { Package, MessageSquare, ExternalLink, RefreshCw, Lock } from 'lucide-react';
import axios from 'axios';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    // Simple password check (in production, use proper auth)
    if (password === 'dental2024!') {
      setIsAuthenticated(true);
      loadOrders();
    } else {
      alert('Incorrect password');
    }
  };

  const loadOrders = async () => {
    setLoading(true);
    try {
      // In production, this would fetch from your database
      // For now, using localStorage as demo
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(storedOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const resendSMS = async (order) => {
    try {
      await axios.post('/api/sms/send', {
        to: order.phone,
        template: 'ORDER_CONFIRM',
        data: {
          orderId: order.id,
          companyName: 'SmileStore'
        }
      });
      alert('SMS resent successfully!');
    } catch (error) {
      console.error('SMS error:', error);
      alert('Failed to resend SMS');
    }
  };

  const openStripeCustomer = (customerId) => {
    window.open(`https://dashboard.stripe.com/customers/${customerId}`, '_blank');
  };

  const openTrelloCard = (cardId) => {
    window.open(`https://trello.com/c/${cardId}`, '_blank');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center p-6">
        <div className="glass rounded-3xl p-8 max-w-md w-full">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Admin Access</h1>
          <p className="text-sm text-secondary text-center mb-6">
            Enter password to view orders
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Enter admin password"
            className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-secondary focus:outline-none focus:border-accent mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full gradient-btn px-6 py-3 rounded-xl font-semibold"
          >
            Login
          </button>
          <p className="text-xs text-secondary text-center mt-4">
            Default password: dental2024!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Order Dashboard</h1>
            <p className="text-secondary">Manage customer orders and communications</p>
          </div>
          <button
            onClick={loadOrders}
            className="glass glass-hover px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass rounded-xl p-6">
            <p className="text-sm text-secondary mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-accent">{orders.length}</p>
          </div>
          <div className="glass rounded-xl p-6">
            <p className="text-sm text-secondary mb-1">Revenue</p>
            <p className="text-3xl font-bold text-emerald">
              ${orders.reduce((sum, o) => sum + (o.total || 0), 0).toFixed(2)}
            </p>
          </div>
          <div className="glass rounded-xl p-6">
            <p className="text-sm text-secondary mb-1">Subscriptions</p>
            <p className="text-3xl font-bold text-gold">
              {orders.filter(o => o.hasSubscription).length}
            </p>
          </div>
          <div className="glass rounded-xl p-6">
            <p className="text-sm text-secondary mb-1">Avg Order</p>
            <p className="text-3xl font-bold">
              ${orders.length > 0 ? (orders.reduce((sum, o) => sum + (o.total || 0), 0) / orders.length).toFixed(2) : '0.00'}
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold">Recent Orders</h2>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-16 h-16 text-secondary mx-auto mb-4" />
              <p className="text-secondary">No orders yet</p>
              <p className="text-sm text-secondary mt-2">
                Orders will appear here after customers complete checkout
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-sm font-semibold text-secondary">Order ID</th>
                    <th className="text-left p-4 text-sm font-semibold text-secondary">Customer</th>
                    <th className="text-left p-4 text-sm font-semibold text-secondary">Items</th>
                    <th className="text-left p-4 text-sm font-semibold text-secondary">Total</th>
                    <th className="text-left p-4 text-sm font-semibold text-secondary">Status</th>
                    <th className="text-left p-4 text-sm font-semibold text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="p-4">
                        <code className="text-xs bg-dark px-2 py-1 rounded">
                          #{order.id?.slice(-8)}
                        </code>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-semibold text-sm">{order.customerName}</p>
                          <p className="text-xs text-secondary">{order.email}</p>
                          <p className="text-xs text-secondary">{order.phone}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{order.itemCount} items</p>
                        {order.hasSubscription && (
                          <span className="text-xs text-emerald">🔄 Subscription</span>
                        )}
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-emerald">${order.total?.toFixed(2)}</p>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'completed' ? 'bg-emerald/20 text-emerald' :
                          order.status === 'processing' ? 'bg-accent/20 text-accent' :
                          'bg-gold/20 text-gold'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => resendSMS(order)}
                            className="p-2 glass-hover rounded-lg"
                            title="Resend SMS"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          {order.stripeCustomerId && (
                            <button
                              onClick={() => openStripeCustomer(order.stripeCustomerId)}
                              className="p-2 glass-hover rounded-lg"
                              title="Open in Stripe"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          )}
                          {order.trelloCardId && (
                            <button
                              onClick={() => openTrelloCard(order.trelloCardId)}
                              className="p-2 glass-hover rounded-lg"
                              title="Open Trello Card"
                            >
                              <Package className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
