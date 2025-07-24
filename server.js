const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace with your connection string from Atlas)
mongoose.connect(
  'mongodb+srv://seatAdmin:SeatPass123@cluster0.fjfd4s3.mongodb.net/seatDB?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define schema and model
const seatSchema = new mongoose.Schema({
  seatId: String,
  name: String,
  title: String,
  status: String
});
const Seat = mongoose.model('Seat', seatSchema);

// Fetch all seats
app.get('/seats', async (req, res) => {
  const seats = await Seat.find();
  res.json(seats);
});

// Update one seat
app.put('/seats/:seatId', async (req, res) => {
  const { seatId } = req.params;
  const { name, title, status } = req.body;

  const seat = await Seat.findOneAndUpdate(
    { seatId },
    { name, title, status },
    { new: true, upsert: true }
  );
  res.json(seat);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));