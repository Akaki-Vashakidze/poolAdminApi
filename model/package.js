var Constants = require('../extra/constants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var packageSchema = new Schema({
  name: String,
  duration: String,
  visitAmount: Number,
  price: String,
  recordState: {type: Number, default: Constants.RECORD_STATE.ACTIVE},
  timestamp: {type: Date, default: new Date()},
});
module.exports = mongoose.model('packages', packageSchema);
