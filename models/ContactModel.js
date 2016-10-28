const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  avatar: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  occupation: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Contact', contactSchema);
