var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fileSchema = new Schema({
  data: Buffer,
  contentType: String,
  timestamp: {
    type: Date, default: new Date()
  },
});
module.exports = mongoose.model('files', fileSchema);
