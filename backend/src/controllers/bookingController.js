const Booking = require('../models/Booking');
const Event = require('../models/Event');
const { generateQRCode } = require('../utils/helpers');
const crypto = require('crypto');

// Book tickets
const bookTickets = async (req, res) => {
  try {
    const { eventId, numberOfTickets } = req.body;

    if (!eventId || !numberOfTickets) {
      return res.status(400).json({ success: false, message: 'Please provide event ID and number of tickets' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check availability
    if (event.totalTicketsBooked + numberOfTickets > event.capacity) {
      return res.status(400).json({ success: false, message: 'Not enough tickets available' });
    }

    const totalPrice = event.ticketPrice * numberOfTickets;

    // Generate tickets with QR codes
    const tickets = [];
    for (let i = 0; i < numberOfTickets; i++) {
      const ticketId = crypto.randomBytes(8).toString('hex');
      const qrData = {
        ticketId,
        eventId,
        userId: req.user.id,
        bookingId: null, // Will be set after booking is created
      };

      const qrCode = await generateQRCode(qrData);

      tickets.push({
        ticketId,
        qrCode,
        isUsed: false,
      });
    }

    // Create booking
    const booking = new Booking({
      user: req.user.id,
      event: eventId,
      numberOfTickets,
      totalPrice,
      tickets,
      paymentStatus: 'completed', // Assuming payment is handled on frontend
      status: 'confirmed',
      qrCode: tickets[0].qrCode, // Primary QR code
    });

    await booking.save();

    // Update event total tickets
    event.totalTicketsBooked += numberOfTickets;
    await event.save();

    res.status(201).json({
      success: true,
      message: 'Tickets booked successfully',
      booking: {
        _id: booking._id,
        numberOfTickets: booking.numberOfTickets,
        totalPrice: booking.totalPrice,
        status: booking.status,
        tickets: booking.tickets.map(t => ({
          ticketId: t.ticketId,
          qrCode: t.qrCode,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user bookings
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('event', 'title startDate venue images')
      .sort({ bookingDate: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('event');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check authorization
    if (booking.user._id.toString() !== req.user.id && booking.event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this booking' });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Update event tickets
    const event = await Event.findById(booking.event);
    event.totalTicketsBooked -= booking.numberOfTickets;
    await event.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify QR code attendance
const verifyAttendance = async (req, res) => {
  try {
    const { ticketId, bookingId } = req.body;

    if (!ticketId || !bookingId) {
      return res.status(400).json({ success: false, message: 'Please provide ticket ID and booking ID' });
    }

    const booking = await Booking.findById(bookingId).populate('event');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check if user is organizer
    if (booking.event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to verify attendance' });
    }

    const ticket = booking.tickets.find(t => t.ticketId === ticketId);

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    if (ticket.isUsed) {
      return res.status(400).json({ success: false, message: 'Ticket already used' });
    }

    ticket.isUsed = true;
    ticket.usedAt = new Date();

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Attendance verified successfully',
      ticket,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get event bookings (Organizer)
const getEventBookings = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const bookings = await Booking.find({ event: eventId })
      .populate('user', 'name email phone')
      .sort({ bookingDate: -1 });

    res.status(200).json({
      success: true,
      bookings,
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((sum, b) => sum + b.totalPrice, 0),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  bookTickets,
  getUserBookings,
  getBookingById,
  cancelBooking,
  verifyAttendance,
  getEventBookings,
};
