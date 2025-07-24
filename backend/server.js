const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Allow only your GitHub Pages frontend
app.use(cors({
  origin: 'https://tmetnick.github.io'
}));

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema & Model
const seatSchema = new mongoose.Schema({
  seatId: { type: String, required: true, unique: true },
  name: String,
  title: String,
  status: { type: String, enum: ['available', 'used', 'reserved'], default: 'available' }
});
const Seat = mongoose.model('Seat', seatSchema);

// Routes
// Fetch all seats
app.get('/seats', async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch seats' });
  }
});

// Update or create one seat
app.put('/seats/:seatId', async (req, res) => {
  try {
    const { seatId } = req.params;
    const { name, title, status } = req.body;
    const seat = await Seat.findOneAndUpdate(
      { seatId },
      { name, title, status },
      { new: true, upsert: true }
    );
    res.json(seat);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update seat' });
  }
});

// Server Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
