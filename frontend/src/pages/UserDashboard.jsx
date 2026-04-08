import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { bookingAPI } from '../utils/apiCalls';
import { Calendar, MapPin, Ticket, QrCode } from 'lucide-react';
import QRCode from 'qrcode.react';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings();
      setBookings(response.data.bookings);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingAPI.cancelBooking(bookingId);
        setBookings(bookings.filter(b => b._id !== bookingId));
      } catch (error) {
        console.error('Failed to cancel booking');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome back, {user?.name}!</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Bookings</h3>
            <p className="text-3xl font-bold">{bookings.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Upcoming Events</h3>
            <p className="text-3xl font-bold">
              {bookings.filter(b => b.event && new Date(b.event.startDate) > new Date()).length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Spent</h3>
            <p className="text-3xl font-bold">
              ₹{bookings.reduce((sum, b) => sum + b.totalPrice, 0)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">My Bookings</h2>
          </div>

          {bookings.length > 0 ? (
            <div className="divide-y">
              {bookings.filter(b => b.event).map(booking => (
                <div key={booking._id} className="p-6 hover:bg-light transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-dark">{booking.event.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-primary" />
                          {new Date(booking.event.startDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-primary" />
                          {booking.event.venue?.city || 'Location TBA'}
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket size={16} className="text-primary" />
                          {booking.numberOfTickets} tickets
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">₹{booking.totalPrice}</p>
                      <p className={`text-sm font-medium ${booking.status === 'confirmed' ? 'text-green-600' : 'text-red-600'}`}>
                        {booking.status.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition text-sm"
                    >
                      <QrCode size={16} />
                      View Tickets
                    </button>
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition text-sm"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-600 text-lg">No bookings yet</p>
              <a href="/events" className="text-primary font-bold hover:underline">
                Browse events
              </a>
            </div>
          )}
        </div>

        {/* QR Code Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Booking QR Code</h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-2xl cursor-pointer text-gray-400 hover:text-dark"
                >
                  ✕
                </button>
              </div>

              <div className="bg-light p-6 rounded-lg mb-4 text-center">
                <p className="font-bold mb-4">{selectedBooking.event.title}</p>
                <div className="flex justify-center">
                  <QRCode value={selectedBooking._id} size={200} />
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-2 mb-4">
                <p><strong>Booking ID:</strong> {selectedBooking._id}</p>
                <p><strong>Tickets:</strong> {selectedBooking.numberOfTickets}</p>
                <p><strong>Total:</strong> ₹{selectedBooking.totalPrice}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
                >
                  Print
                </button>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="flex-1 bg-light px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
