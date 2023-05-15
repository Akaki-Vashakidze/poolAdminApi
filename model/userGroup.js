var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var constants = require('../extra/constants');
var userGroupSchema = new Schema({
    name: String,
    description: String,
    recordState:  { type: Number, default: constants.RECORD_STATE.ACTIVE },
    timestamp: { type: Date, default: new Date() }
});
module.exports=  mongoose.model('userGroups', userGroupSchema);
