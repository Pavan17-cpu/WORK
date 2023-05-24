const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  workName: { type: String, required: true },
  endTime: { type: Date, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model('Work', workSchema);
