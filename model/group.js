var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const constants = require('../extra/constants');


var groupSchema = new Schema({
  name: String,
  parentId: {
    type:String,
    ref: 'groups'
  },
  recordState: {
    type: Number,
    default: constants.RECORD_STATE.ACTIVE
  },
  timestamp: {
    type: Date,
    default: new Date()
  }
});
module.exports = mongoose.model('groups', groupSchema);
