const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an event title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide an event description'],
    },
    category: {
      type: String,
      enum: ['festival', 'workshop', 'meetup', 'conference', 'concert', 'sports', 'other'],
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Please provide a start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please provide an end date'],
    },
    time: {
      type: String,
      required: true,
    },
    venue: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      latitude: Number,
      longitude: Number,
    },
    capacity: {
      type: Number,
      required: [true, 'Please provide event capacity'],
      min: 1,
    },
    ticketPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    totalTicketsBooked: {
      type: Number,
      default: 0,
    },
    images: [String],
    tags: [String],
    status: {
      type: String,
      enum: ['draft', 'published', 'cancelled', 'completed'],
      default: 'draft',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for geospatial queries
eventSchema.index({ 'venue.latitude': 1, 'venue.longitude': 1 });

module.exports = mongoose.model('Event', eventSchema);
