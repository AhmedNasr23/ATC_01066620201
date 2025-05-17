const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  date: Date,
  venue: String,
  price: Number,
  image: String,
});

module.exports = mongoose.model('Event', eventSchema);
