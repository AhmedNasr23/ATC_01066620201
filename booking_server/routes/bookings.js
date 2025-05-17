const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/authMiddleware');

// Check if current user booked an event
router.get('/check', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      user: req.user.id,
      event: req.query.eventId
    });
    res.json({ isBooked: !!booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bookings for current user
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create booking
router.post('/', authMiddleware, async (req, res) => {
  try {
    const booking = new Booking({
      user: req.user.id,
      event: req.body.eventId
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: 'Booking failed' });
  }
});

module.exports = router;