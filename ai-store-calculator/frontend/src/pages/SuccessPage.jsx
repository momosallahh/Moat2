import React, { useState, useEffect } from 'react';
import { CheckCircle, MessageSquare, Calendar, Download, ArrowLeft } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [smsSending, setSmsSending] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const sessionId = searchParams.get('session_id');

  const handleSendConfirmation = async () => {
    if (!phone) {
      alert('Please enter your phone number');
      return;
    }

    setSmsSending(true);
    try {
      await axios.post('/api/sms/send', {
        to: phone,
        template: 'ORDER_CONFIRM',
        data: {
          orderId: sessionId?.slice(-8) || '12345678',
          companyName: 'SmileStore'
        }
      });
      setSmsSent(true);
    } catch (error) {
      console.error('SMS error:', error);
      alert('Failed to send SMS. Please try again.');
    } finally {
      setSmsSending(false);
    }
  };

  const handleBookAppointment = () => {
    window.open('https://calendly.com/smilestore', '_blank');
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="glass rounded-3xl p-8 md:p-12 text-center mb-6">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-emerald" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-lg text-secondary mb-2">
            Thank you for your purchase
          </p>
          <p className="text-sm text-secondary mb-8">
            Order #{sessionId?.slice(-8) || '12345678'}
          </p>

          {/* Confirmation Email Notice */}
          <div className="glass rounded-xl p-4 mb-8">
            <p className="text-sm text-secondary">
              📧 A confirmation email has been sent to your inbox with order details and tracking information.
            </p>
          </div>

          {/* SMS Confirmation */}
          <div className="glass rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <MessageSquare className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Get Text Updates</h3>
            </div>
            <p className="text-sm text-secondary mb-4">
              Receive order updates and exclusive offers via SMS
            </p>
            {!smsSent ? (
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="flex-1 bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-secondary focus:outline-none focus:border-accent"
                />
                <button
                  onClick={handleSendConfirmation}
                  disabled={smsSending}
                  className="gradient-btn px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
                >
                  {smsSending ? 'Sending...' : 'Send'}
                </button>
              </div>
            ) : (
              <div className="glass rounded-lg p-3 text-emerald">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Confirmation sent!
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={handleBookAppointment}
              className="glass glass-hover px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book Cleaning Appointment
            </button>
            <button
              onClick={() => window.print()}
              className="glass glass-hover px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Receipt
            </button>
          </div>

          {/* Return Home */}
          <button
            onClick={() => navigate('/')}
            className="text-accent hover:text-emerald font-semibold flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>

        {/* What's Next */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold mb-4">What happens next?</h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <span className="text-accent font-bold text-sm">1</span>
              </div>
              <div>
                <p className="font-semibold text-sm">Order Processing</p>
                <p className="text-xs text-secondary">We're preparing your items for shipment</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <span className="text-accent font-bold text-sm">2</span>
              </div>
              <div>
                <p className="font-semibold text-sm">Quality Check</p>
                <p className="text-xs text-secondary">Every product is inspected before shipping</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <span className="text-accent font-bold text-sm">3</span>
              </div>
              <div>
                <p className="font-semibold text-sm">Delivery</p>
                <p className="text-xs text-secondary">Ships within 1-2 business days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
