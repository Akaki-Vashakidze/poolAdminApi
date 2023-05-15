var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
  userId: Schema.Types.ObjectId,
  dataId: Schema.Types.ObjectId,
  type: Number,
  changeType: Number,
  value: Object,
  timestamp: {type: Date, default: new Date()},
});
module.exports = mongoose.model('history', historySchema);
