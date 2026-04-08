const express = require('express');
const router = express.Router();
const {
  bookTickets,
  getUserBookings,
  getBookingById,
  cancelBooking,
  verifyAttendance,
  getEventBookings,
} = require('../controllers/bookingController');
const { verifyJWT, authorize } = require('../middleware/auth');

// Book tickets (user only)
router.post('/', verifyJWT, authorize(['user']), bookTickets);

// Get user bookings (protected)
router.get('/my-bookings', verifyJWT, authorize(['user']), getUserBookings);

// Get booking by ID (protected)
router.get('/:id', verifyJWT, getBookingById);

// Cancel booking (user only)
router.put('/:id/cancel', verifyJWT, authorize(['user']), cancelBooking);

// Verify attendance (organizer only)
router.put('/verify-attendance', verifyJWT, authorize(['organizer']), verifyAttendance);

// Get event bookings (organizer only)
router.get('/event/:eventId', verifyJWT, authorize(['organizer']), getEventBookings);

module.exports = router;
