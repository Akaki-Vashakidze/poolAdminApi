var mongoose = require('mongoose');
var Constants = require('../extra/constants');

var raceSchema = new mongoose.Schema({
    event: String,
    title: String,
    distance:Number,
    sex: String,
    isSelection: {type:Boolean,default:false},
    participants: { type:Object, default:{}},
    recordState: { type:Number, default:Constants.RECORD_STATE.ACTIVE},
    timestamp: { type:Date,default:new Date() }
});
module.exports =  mongoose.model('race', raceSchema);
