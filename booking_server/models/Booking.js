const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  bookedAt: { type: Date, default: Date.now },
});

// Prevent duplicate bookings per user per event
BookingSchema.index({ user: 1, event: 1 }, { unique: true });

module.exports = mongoose.model('Booking', BookingSchema);
