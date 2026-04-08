import api from './api';

// Auth API calls
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Event API calls
export const eventAPI = {
  getAllEvents: (params) => api.get('/events', { params }),
  getEventById: (id) => api.get(`/events/${id}`),
  createEvent: (data) => api.post('/events', data),
  updateEvent: (id, data) => api.put(`/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/events/${id}`),
  getOrganizerEvents: () => api.get('/events/organizer/my-events'),
};

// Booking API calls
export const bookingAPI = {
  bookTickets: (data) => api.post('/bookings', data),
  getUserBookings: () => api.get('/bookings/my-bookings'),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  cancelBooking: (id) => api.put(`/bookings/${id}/cancel`),
  verifyAttendance: (data) => api.put('/bookings/verify-attendance', data),
  getEventBookings: (eventId) => api.get(`/bookings/event/${eventId}`),
};

// Rating API calls
export const ratingAPI = {
  addRating: (data) => api.post('/ratings', data),
  getEventRatings: (eventId, params) => api.get(`/ratings/event/${eventId}`, { params }),
  updateRating: (id, data) => api.put(`/ratings/${id}`, data),
  deleteRating: (id) => api.delete(`/ratings/${id}`),
};
