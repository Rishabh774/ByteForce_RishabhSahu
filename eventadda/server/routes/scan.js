const express = require('express');
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const Event = require('../models/Event');

const router = express.Router();

// @route   POST /api/scan
// @desc    Organizer scans QR to mark attendance
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'organizer') {
      return res.status(403).json({ msg: 'Only organizers can scan tickets' });
    }

    const { qrData } = req.body;
    if (!qrData) return res.status(400).json({ msg: 'QR data required' });

    // qrData format: eventId|userId|timestamp
    const [eventId, userId] = qrData.split('|');
    
    // Verify that the event belongs to this organizer
    const event = await Event.findOne({ _id: eventId, organizerId: req.user.id });
    if (!event) {
      return res.status(403).json({ msg: 'You are not authorized to scan tickets for this event' });
    }

    // Find booking
    const booking = await Booking.findOne({ eventId, userId, qrCodeData: qrData });
    if (!booking) {
      return res.status(404).json({ msg: 'Invalid ticket' });
    }

    if (booking.attended) {
      return res.status(400).json({ msg: 'Ticket already used' });
    }

    booking.attended = true;
    await booking.save();

    res.json({ msg: 'Attendance marked successfully', booking });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;