const History = require('../model/history');
const Pool = require('../model/pool');
const responseHelper = require('../extra/responseHelper');
const constants = require('../extra/constants');

async function findUserInfo(req, res) {
  let data = req.body.data,
    paging = req.body.paging,
    searchQuery = {
      changeType: constants.HISTORY.CHANGE_TYPE.USER_INFO
    };
  Object.keys(data).forEach(key => {
    if (data[key]) {
      searchQuery[key] = data[key];
    }
  });
  const history = await History.find(searchQuery)
    .skip((paging.limit * paging.page) - paging.limit)
    .limit(paging.limit)
    .exec();
  const count = await History.countDocuments(searchQuery).exec();
  return {
    items: history,
    totalItems: count
  };
}

async function findPool(req, res) {
  let data = req.body.data,
    paging = req.body.paging,
    searchQuery = {
      $or: [
        { changeType: constants.HISTORY.CHANGE_TYPE.NEW_PACKAGE },
        { changeType: constants.HISTORY.CHANGE_TYPE.BUG_FIX },
        { changeType: constants.HISTORY.CHANGE_TYPE.VISIT },
      ]
    };
  Object.keys(data).forEach(key => {
    if (data[key]) {
      searchQuery[key] = data[key];
    }
  });
  const history = await Pool.findHistory(data.dataId);
  // const count = await History.countDocuments(searchQuery).exec();
  return {
    items: history,
    totalItems: 0
  };
}

module.exports = {
  findUserInfo, findPool
};
