const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    numberOfTickets: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'completed'],
      default: 'confirmed',
    },
    qrCode: {
      type: String, // Data URL for QR code
      required: true,
    },
    tickets: [
      {
        ticketId: String,
        qrCode: String,
        isUsed: {
          type: Boolean,
          default: false,
        },
        usedAt: Date,
      },
    ],
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    paymentId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
