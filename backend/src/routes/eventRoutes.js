const express = require('express');
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getOrganizerEvents,
} = require('../controllers/eventController');
const { verifyJWT, authorize } = require('../middleware/auth');

// Get all events (public)
router.get('/', getAllEvents);

// Get event by ID (public)
router.get('/:id', getEventById);

// Create event (organizer only)
router.post('/', verifyJWT, authorize(['organizer']), createEvent);

// Update event (organizer only)
router.put('/:id', verifyJWT, authorize(['organizer']), updateEvent);

// Delete event (organizer only)
router.delete('/:id', verifyJWT, authorize(['organizer']), deleteEvent);

// Get organizer's events (organizer only)
router.get('/organizer/my-events', verifyJWT, authorize(['organizer']), getOrganizerEvents);

module.exports = router;
