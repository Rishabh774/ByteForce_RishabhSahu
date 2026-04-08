import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { eventAPI, bookingAPI, ratingAPI } from '../utils/apiCalls';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import RatingCard from '../components/RatingCard';
import QRCode from 'qrcode.react';
import { MapPin, Calendar, Users, Ticket, Star } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [ratingForm, setRatingForm] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    fetchEventDetails();
    fetchRatings();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const response = await eventAPI.getEventById(id);
      setEvent(response.data.event);
    } catch (error) {
      setToast({ message: 'Failed to load event', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await ratingAPI.getEventRatings(id);
      setRatings(response.data.ratings);
    } catch (error) {
      console.error('Failed to fetch ratings');
    }
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    // Check if user is not organizer
    if (user?.role === 'organizer') {
      setToast({ message: 'Organizers cannot book tickets', type: 'error' });
      return;
    }

    setIsBooking(true);
    try {
      // Store booking intent in sessionStorage
      sessionStorage.setItem('bookingIntent', JSON.stringify({
        eventId: id,
        numberOfTickets,
        totalPrice: event.ticketPrice * numberOfTickets,
        eventTitle: event.title,
      }));

      // Redirect to payment page
      window.location.href = '/payment';
    } catch (error) {
      setToast({
        message: 'Failed to proceed with booking',
        type: 'error',
      });
      setIsBooking(false);
    }
  };

  const handleRating = async (e) => {
    e.preventDefault();
    try {
      // Find user's booking for this event
      const bookingResponse = await bookingAPI.getUserBookings();
      const userBooking = bookingResponse.data.bookings.find(b => b.event._id === id);

      if (!userBooking) {
        setToast({ message: 'You must book this event first to leave a rating', type: 'warning' });
        return;
      }

      await ratingAPI.addRating({
        eventId: id,
        bookingId: userBooking._id,
        ...ratingForm,
      });

      setToast({ message: 'Rating added successfully!', type: 'success' });
      setRatingForm({ rating: 5, comment: '' });
      fetchRatings();
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Failed to add rating',
        type: 'error',
      });
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!event) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Event not found</p>
      </div>
    );
  }

  const availableTickets = event.capacity - event.totalTicketsBooked;

  return (
    <div className="min-h-screen bg-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {toast && (
          <div className="mb-4">
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            {event.images && event.images[0] && (
              <div className="h-96 bg-gray-300 rounded-lg overflow-hidden mb-6">
                <img
                  src={event.images[0]}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Event Info */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary bg-opacity-20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {event.category}
                </span>
                {availableTickets < 10 && availableTickets > 0 && (
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                    Last {availableTickets} tickets
                  </span>
                )}
              </div>

              <div className="space-y-3 text-gray-600 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="text-primary" size={20} />
                  <span>{new Date(event.startDate).toLocaleDateString()} at {event.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-primary" size={20} />
                  <span>{event.venue.name}, {event.venue.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-primary" size={20} />
                  <span>{event.capacity} capacity, {availableTickets} available</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-bold mb-3">About Event</h3>
                <p className="text-gray-600 line-height-relaxed">{event.description}</p>
              </div>
            </div>

            {/* Ratings Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6">Reviews</h3>

              {isAuthenticated && user?.role === 'user' && (
                <form onSubmit={handleRating} className="mb-6 p-4 bg-light rounded-lg">
                  <h4 className="font-bold mb-3">Leave a Review</h4>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(i => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setRatingForm(prev => ({ ...prev, rating: i }))}
                          className="text-2xl transition"
                        >
                          <Star
                            size={32}
                            className={i <= ratingForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={ratingForm.comment}
                    onChange={(e) => setRatingForm(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Share your experience..."
                    className="w-full p-2 border border-gray-300 rounded-lg mb-3 outline-none focus:border-primary"
                    rows="3"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
                  >
                    Post Review
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {ratings.length > 0 ? (
                  ratings.map(rating => (
                    <RatingCard key={rating._id} rating={rating} />
                  ))
                ) : (
                  <p className="text-gray-600">No reviews yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-20 space-y-4">
              <div className="text-3xl font-bold text-primary">₹{event.ticketPrice}</div>

              {availableTickets > 0 ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Tickets</label>
                    <input
                      type="number"
                      min="1"
                      max={availableTickets}
                      value={numberOfTickets}
                      onChange={(e) => setNumberOfTickets(Math.max(1, parseInt(e.target.value)))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary"
                    />
                  </div>

                  <div className="bg-light p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal:</span>
                      <span>₹{event.ticketPrice * numberOfTickets}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span className="text-primary">₹{event.ticketPrice * numberOfTickets}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={isBooking}
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition disabled:opacity-50"
                  >
                    {isBooking ? 'Processing...' : 'Book Now'}
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-lg font-bold text-red-600">Sold Out</p>
                </div>
              )}

              {/* Event Stats */}
              <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                <p>📍 {event.venue.city}</p>
                <p>👥 {event.totalTicketsBooked} booked</p>
                <p>🎟️ {availableTickets} remaining</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
