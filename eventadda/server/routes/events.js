const express = require('express');
const auth = require('../middleware/auth');
const Event = require('../models/Event');

const router = express.Router();

// @route   POST /api/events
// @desc    Create event (organizer only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'organizer') {
      return res.status(403).json({ msg: 'Access denied. Only organizers can create events.' });
    }

    const { title, description, date, location, price, category, isClubEvent } = req.body;
    
    // Generate a simple secret for QR verification
    const qrSecret = Math.random().toString(36).substring(2, 15);
    
    const event = new Event({
      title,
      description,
      date,
      location: {
        name: location.name,
        coordinates: location.coordinates // [lng, lat]
      },
      price,
      category,
      organizerId: req.user.id,
      isClubEvent: isClubEvent || false,
      qrSecret
    });

    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/events/nearby
// @desc    Get events within radius (km)
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 5 } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ msg: 'Latitude and longitude required' });
    }

    const events = await Event.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: radius * 1000 // convert km to meters
        }
      },
      date: { $gte: new Date() } // only upcoming events
    }).populate('organizerId', 'name');

    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/events/my
// @desc    Get events created by logged-in organizer
router.get('/my', auth, async (req, res) => {
  try {
    if (req.user.role !== 'organizer') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    const events = await Event.find({ organizerId: req.user.id });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/events/clone/:id
// @desc    Clone event (instant creation for clubs)
router.post('/clone/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'organizer') {
      return res.status(403).json({ msg: 'Only organizers can clone events' });
    }

    const original = await Event.findById(req.params.id);
    if (!original) return res.status(404).json({ msg: 'Event not found' });

    const newEvent = new Event({
      title: `${original.title} (Copy)`,
      description: original.description,
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // next week
      location: original.location,
      price: original.price,
      category: original.category,
      organizerId: req.user.id,
      isClubEvent: original.isClubEvent,
      qrSecret: Math.random().toString(36).substring(2, 15)
    });

    await newEvent.save();
    res.json(newEvent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;