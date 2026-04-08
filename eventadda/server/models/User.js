const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'organizer'], default: 'user' },
  isClubVerified: { type: Boolean, default: false }, // for unique twist
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);