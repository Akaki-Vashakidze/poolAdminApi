var schema = require('mongoose').Schema;
const History = require('../model/history');
module.exports = {
  insert: function (req, type, changeType, value) {
    const history = new History();
    history.userId = req.session.user._id;
    history.type = type;
    history.dataId = value._id;
    history.changeType = changeType;
    history.value = JSON.stringify(value);
    history.save();
  }
};
