var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Constants = require('../extra/constants');


var eventSchema = new Schema({
    name: String,
    description:String,
    startDate: Date,
    endDate: Date,
    location: String,
    coverName:String,
    coverId:String,
    participants:{type:Array,default:[]},
    authorUserId:String,
    recordState: {type:Number,default:Constants.RECORD_STATE.ACTIVE},
    timestamp:  {type:Date,default:new Date()}
});
module.exports=  mongoose.model('event', eventSchema);
