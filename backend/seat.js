const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['available', 'used', 'reserved'],
    default: 'available'
  }
});

module.exports = mongoose.model('Seat', seatSchema);