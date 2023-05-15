var mongoose = require('mongoose');
const constants = require('../extra/constants');

var coachSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: String,
  profile: {
    type: constants.coach.Profile,
    required: false
  },
  contact: {
    type: constants.coach.Contact,
    required: false
  },
  pool: {
    type: constants.coach.Pool,
    required: false
  },
  recordState: Number,
  userGroupId: Number,
  isVerified: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: new Date()
  },
});

module.exports = mongoose.model('coaches', coachSchema);
