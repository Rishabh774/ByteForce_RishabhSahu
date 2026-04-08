const Rating = require('../models/Rating');
const Booking = require('../models/Booking');

// Add rating
const addRating = async (req, res) => {
  try {
    const { eventId, bookingId, rating, comment } = req.body;

    if (!eventId || !bookingId || !rating) {
      return res.status(400).json({ success: false, message: 'Please provide event ID, booking ID, and rating' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    // Check if booking exists and belongs to user
    const booking = await Booking.findById(bookingId);
    if (!booking || booking.user.toString() !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check if rating already exists
    const existingRating = await Rating.findOne({ user: req.user.id, event: eventId });
    if (existingRating) {
      return res.status(400).json({ success: false, message: 'You have already rated this event' });
    }

    const newRating = new Rating({
      user: req.user.id,
      event: eventId,
      booking: bookingId,
      rating,
      comment,
    });

    await newRating.save();

    res.status(201).json({
      success: true,
      message: 'Rating added successfully',
      rating: newRating,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get event ratings
const getEventRatings = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const ratings = await Rating.find({ event: eventId })
      .populate('user', 'name profilePicture')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Rating.countDocuments({ event: eventId });

    // Calculate average rating
    const avgRating = await Rating.aggregate([
      { $match: { event: require('mongoose').Types.ObjectId(eventId) } },
      { $group: { _id: '$event', averageRating: { $avg: '$rating' } } },
    ]);

    res.status(200).json({
      success: true,
      ratings,
      averageRating: avgRating.length > 0 ? avgRating[0].averageRating : 0,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        totalRecords: total,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update rating
const updateRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    const { rating, comment } = req.body;

    const existingRating = await Rating.findById(ratingId);

    if (!existingRating) {
      return res.status(404).json({ success: false, message: 'Rating not found' });
    }

    if (existingRating.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this rating' });
    }

    if (rating) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
      }
      existingRating.rating = rating;
    }

    if (comment) {
      existingRating.comment = comment;
    }

    await existingRating.save();

    res.status(200).json({
      success: true,
      message: 'Rating updated successfully',
      rating: existingRating,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete rating
const deleteRating = async (req, res) => {
  try {
    const { ratingId } = req.params;

    const rating = await Rating.findById(ratingId);

    if (!rating) {
      return res.status(404).json({ success: false, message: 'Rating not found' });
    }

    if (rating.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this rating' });
    }

    await Rating.findByIdAndDelete(ratingId);

    res.status(200).json({
      success: true,
      message: 'Rating deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addRating,
  getEventRatings,
  updateRating,
  deleteRating,
};
