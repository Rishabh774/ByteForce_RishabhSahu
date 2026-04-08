const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: {
    name: { type: String, required: true },
    coordinates: { type: [Number], index: '2dsphere' } // [longitude, latitude]
  },
  price: { type: Number, default: 0 },
  category: { type: String, enum: ['tech', 'music', 'college_fest', 'other'] },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isClubEvent: { type: Boolean, default: false },
  totalBookings: { type: Number, default: 0 },
  qrSecret: String, // unique per event for scan validation
  createdAt: { type: Date, default: Date.now }
});

// Create 2dsphere index for geospatial queries
eventSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Event', eventSchema);