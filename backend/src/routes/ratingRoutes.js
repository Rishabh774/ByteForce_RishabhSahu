const express = require('express');
const router = express.Router();
const {
  addRating,
  getEventRatings,
  updateRating,
  deleteRating,
} = require('../controllers/ratingController');
const { verifyJWT } = require('../middleware/auth');

// Add rating (protected)
router.post('/', verifyJWT, addRating);

// Get event ratings (public)
router.get('/event/:eventId', getEventRatings);

// Update rating (protected)
router.put('/:ratingId', verifyJWT, updateRating);

// Delete rating (protected)
router.delete('/:ratingId', verifyJWT, deleteRating);

module.exports = router;
