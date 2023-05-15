var mongoose = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate');

const constants = require('../extra/constants');
var userSchema = new mongoose.Schema({
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
    type: constants.user.Profile,
    required: false
  },
  contact: {
    type: constants.user.Contact,
    required: false
  },
  pool: {
    type: String,
    required: false,
    ref: 'pool'
  },
  card: {
    type: String,
    ref: 'cards'
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
  }
});
// userSchema.plugin(mongoosePaginate);

userSchema.pre('find', async function (next) {
  this.populate([{ path: 'pool', populate: [{ path: 'group' }, { path: 'coach' }, { path: 'package' }] }, { path: 'card' }]);
  next();
})

module.exports = mongoose.model('users', userSchema);
