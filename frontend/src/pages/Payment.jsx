import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { bookingAPI } from '../utils/apiCalls';
import Toast from '../components/Toast';
import { Copy, Check } from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [bookingIntent, setBookingIntent] = useState(null);
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const MERCHANT_UPI = '8294950445@pthdfc';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const intent = sessionStorage.getItem('bookingIntent');
    if (!intent) {
      navigate('/events');
      return;
    }

    setBookingIntent(JSON.parse(intent));
  }, [isAuthenticated, navigate]);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(MERCHANT_UPI);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = async () => {
    if (!bookingIntent) return;

    setIsProcessing(true);
    setToast({ message: 'Processing payment...', type: 'info' });

    try {
      const response = await bookingAPI.bookTickets({
        eventId: bookingIntent.eventId,
        numberOfTickets: bookingIntent.numberOfTickets,
      });

      if (response.data.success || response.data.booking) {
        setToast({
          message: '✅ Payment successful! Redirecting...',
          type: 'success',
        });
        sessionStorage.removeItem('bookingIntent');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Payment failed',
        type: 'error',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!bookingIntent) {
    return (
      <div className="min-h-screen bg-light py-8">
        <div className="max-w-md mx-auto px-4 text-center">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-8">
      <div className="max-w-md mx-auto px-4">
        {toast && (
          <div className="mb-4">
            <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-dark">Payment</h1>

          {/* Order Summary */}
          <div className="bg-light p-4 rounded space-y-2">
            <div className="flex justify-between text-sm">
              <span>Event:</span>
              <span className="font-bold">{bookingIntent.eventTitle}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tickets:</span>
              <span className="font-bold">x{bookingIntent.numberOfTickets}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-primary">₹{bookingIntent.totalPrice}</span>
            </div>
          </div>

          {/* UPI Payment */}
          <div className="bg-blue-50 border border-blue-200 rounded p-4 space-y-3">
            <p className="text-sm font-bold text-blue-900">Send Payment To:</p>
            
            <div className="flex items-center gap-2 bg-white p-3 rounded border border-gray-300">
              <code className="flex-1 font-mono text-dark text-sm">{MERCHANT_UPI}</code>
              <button
                onClick={handleCopyUPI}
                className="p-2 hover:bg-gray-100 rounded transition"
              >
                {copied ? (
                  <Check size={18} className="text-green-600" />
                ) : (
                  <Copy size={18} className="text-gray-600" />
                )}
              </button>
            </div>

            <p className="text-xs text-blue-800">
              Copy the UPI ID → Open Google Pay / PhonePe / Paytm → Transfer ₹{bookingIntent.totalPrice}
            </p>
          </div>

          {/* Amount to Transfer */}
          <div className="bg-gray-100 p-4 rounded text-center">
            <p className="text-xs text-gray-600 mb-1">Amount to Transfer:</p>
            <p className="text-3xl font-bold text-primary">₹{bookingIntent.totalPrice}</p>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirmPayment}
            disabled={isProcessing}
            className="w-full bg-primary text-white py-3 rounded font-bold hover:bg-opacity-90 transition disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'I Have Paid - Confirm'}
          </button>

          {/* Cancel Button */}
          <button
            onClick={() => {
              sessionStorage.removeItem('bookingIntent');
              navigate(-1);
            }}
            className="w-full bg-gray-300 text-dark py-2 rounded font-semibold hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
