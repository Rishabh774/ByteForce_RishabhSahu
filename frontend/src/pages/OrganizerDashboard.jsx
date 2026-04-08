import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventAPI, bookingAPI } from '../utils/apiCalls';
import Toast from '../components/Toast';
import { Plus, Edit2, Trash2, Eye, QrCode } from 'lucide-react';

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'festival',
    startDate: '',
    endDate: '',
    time: '',
    'venue.name': '',
    'venue.address': '',
    'venue.city': '',
    capacity: '',
    ticketPrice: '',
    tags: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventAPI.getOrganizerEvents();
      setEvents(response.data.events);
    } catch (error) {
      setToast({ message: 'Failed to fetch events', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    try {
      const eventData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        time: formData.time,
        venue: {
          name: formData['venue.name'],
          address: formData['venue.address'],
          city: formData['venue.city'],
        },
        capacity: parseInt(formData.capacity),
        ticketPrice: parseFloat(formData.ticketPrice),
        tags: formData.tags.split(',').map(t => t.trim()),
      };

      const response = await eventAPI.createEvent(eventData);

      if (response.data.success) {
        setToast({ message: 'Event created successfully!', type: 'success' });
        setShowCreateForm(false);
        setFormData({
          title: '',
          description: '',
          category: 'festival',
          startDate: '',
          endDate: '',
          time: '',
          'venue.name': '',
          'venue.address': '',
          'venue.city': '',
          capacity: '',
          ticketPrice: '',
          tags: '',
        });
        fetchEvents();
      }
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Failed to create event',
        type: 'error',
      });
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventAPI.deleteEvent(eventId);
        setToast({ message: 'Event deleted successfully', type: 'success' });
        fetchEvents();
      } catch (error) {
        setToast({ message: 'Failed to delete event', type: 'error' });
      }
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

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

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
            <p className="text-gray-600">Manage your events and bookings</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/qr-scanner')}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <QrCode size={20} />
              Scan Tickets
            </button>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
            >
              <Plus size={20} />
              Create Event
            </button>
          </div>
        </div>

        {/* Create Event Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Create New Event</h2>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-primary"
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-primary"
                >
                  <option value="festival">Festival</option>
                  <option value="workshop">Workshop</option>
                  <option value="meetup">Meetup</option>
                  <option value="conference">Conference</option>
                  <option value="concert">Concert</option>
                  <option value="sports">Sports</option>
                </select>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-primary"
                />

                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-primary"
                />

                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-primary"
                />

                <input
                  type="text"
                  name="venue.name"
                  placeholder="Venue Name"
                  value={formData['venue.name']}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-primary"
                />

                <input
                  type="text"
                  name="venue.address"
                  placeholder="Venue Address"
                  value={formData['venue.address']}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-primary"
                />

                <input
                  type="text"
                  name="venue.city"
                  placeholder="City"
                  value={formData['venue.city']}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-primary"
                />

                <input
                  type="number"
                  name="capacity"
                  placeholder="Capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-primary"
                />

                <input
                  type="number"
                  name="ticketPrice"
                  placeholder="Ticket Price"
                  value={formData.ticketPrice}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-primary"
                />
              </div>

              <textarea
                name="description"
                placeholder="Event Description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-primary"
              />

              <input
                type="text"
                name="tags"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-primary"
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
                >
                  Create Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-300 text-dark px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">My Events ({events.length})</h2>
          </div>

          {events.length > 0 ? (
            <div className="divide-y">
              {events.map(event => (
                <div key={event._id} className="p-6 hover:bg-light transition">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>📅 {new Date(event.startDate).toLocaleDateString()}</p>
                        <p>📍 {event.venue.city}</p>
                        <p>🎟️ {event.totalTicketsBooked}/{event.capacity} tickets</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary mb-2">₹{event.ticketPrice}</p>
                      <p className={`text-sm font-medium ${event.status === 'published' ? 'text-green-600' : 'text-orange-600'}`}>
                        {event.status.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-4 flex-wrap">
                    <button
                      onClick={() => navigate(`/event/${event._id}`)}
                      className="flex items-center gap-2 text-primary hover:bg-primary hover:bg-opacity-10 px-4 py-2 rounded-lg transition text-sm"
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/organizer/event/${event._id}/bookings`)}
                      className="flex items-center gap-2 text-secondary hover:bg-secondary hover:bg-opacity-10 px-4 py-2 rounded-lg transition text-sm"
                    >
                      📊 Bookings
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="flex items-center gap-2 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg transition text-sm"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">No events created yet</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
              >
                Create Your First Event
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
