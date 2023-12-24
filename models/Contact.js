const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
  contactName: {
    type: String,
    required: false
  },
  contactEmail: {
    type: String,
    required: false
  },
  contactMsg: {
    type: String,
    required: false
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Contact', ContactSchema);