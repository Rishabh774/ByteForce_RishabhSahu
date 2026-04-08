const Event = require('../models/Event');

// Create event (Organizer only)
const createEvent = async (req, res) => {
  try {
    const { title, description, category, startDate, endDate, time, venue, capacity, ticketPrice, tags, images } = req.body;

    if (!title || !description || !category || !venue || !capacity || !ticketPrice) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const event = new Event({
      title,
      description,
      category,
      organizer: req.user.id,
      startDate,
      endDate,
      time,
      venue,
      capacity,
      ticketPrice,
      tags,
      images,
      status: 'published',
    });

    await event.save();

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all events with filtering and pagination
const getAllEvents = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10, latitude, longitude, distance = 50 } = req.query;

    let filter = { status: 'published' };

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Geolocation filtering
    if (latitude && longitude) {
      filter['venue.latitude'] = { $gte: parseFloat(latitude) - 0.5, $lte: parseFloat(latitude) + 0.5 };
      filter['venue.longitude'] = { $gte: parseFloat(longitude) - 0.5, $lte: parseFloat(longitude) + 0.5 };
    }

    const skip = (page - 1) * limit;
    const events = await Event.find(filter)
      .populate('organizer', 'name email phone')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ startDate: 1 });

    const total = await Event.countDocuments(filter);

    res.status(200).json({
      success: true,
      events,
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

// Get event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name email phone');

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check authorization
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this event' });
    }

    const { title, description, category, startDate, endDate, time, venue, capacity, ticketPrice, tags, images, status } = req.body;

    if (title) event.title = title;
    if (description) event.description = description;
    if (category) event.category = category;
    if (startDate) event.startDate = startDate;
    if (endDate) event.endDate = endDate;
    if (time) event.time = time;
    if (venue) event.venue = venue;
    if (capacity) event.capacity = capacity;
    if (ticketPrice !== undefined) event.ticketPrice = ticketPrice;
    if (tags) event.tags = tags;
    if (images) event.images = images;
    if (status) event.status = status;

    await event.save();

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      event,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this event' });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get organizer's events
const getOrganizerEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getOrganizerEvents,
};
