const express = require('express');
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const QRCode = require('qrcode');

const router = express.Router();

// @route   POST /api/bookings/:eventId
// @desc    Book a ticket (generates QR)
router.post('/:eventId', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    // Check if already booked
    const existing = await Booking.findOne({ userId: req.user.id, eventId: event._id });
    if (existing) return res.status(400).json({ msg: 'Already booked this event' });

    // Generate unique QR data (eventId + userId + timestamp)
    const qrData = `${event._id}|${req.user.id}|${Date.now()}`;
    // Optional: generate QR as dataURL (but we'll store just the data)
    // const qrImage = await QRCode.toDataURL(qrData);
    
    const booking = new Booking({
      userId: req.user.id,
      eventId: event._id,
      qrCodeData: qrData
    });

    await booking.save();
    
    // Increment total bookings for event
    event.totalBookings += 1;
    await event.save();

    res.json({ booking, qrData });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/bookings/my
// @desc    Get all bookings of logged-in user
router.get('/my', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('eventId');
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;