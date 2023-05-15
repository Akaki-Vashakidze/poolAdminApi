const md5 = require('crypto-md5');
const Users = require('../model/user');
const Visit = require('../model/visit');
const Card = require('../model/card');
const history = require('../extra/historyHelper');
const Pool = require('../model/pool');
const responseHelper = require('../extra/responseHelper');
const constants = require('../extra/constants');
const population = function (key) {
  return {
    path: key,
    match: { recordState: constants.RECORD_STATE.ACTIVE }
  }
};


async function userFind(req, res) {
  let data = req.body.data,
    paging = req.body.paging,
    searchQuery = {
      userGroupId: constants.USER_GROUPS.USER
    };
  Object.keys(data).forEach(key => {
    if (data[key] || data[key] === false) {
      // if (key == 'pool.startDate') {
      //   searchQuery[key] = { $gte: data[key] };
      // } if (key == 'pool.endDate') {
      //   searchQuery[key] = { $lte: data[key] };
      // } else {
      searchQuery[key] = data[key];
      // }
    }
  });
  const [user, count] = await Promise.all([
    Users.find(searchQuery)
      .skip((paging.limit * paging.page) - paging.limit)
      .limit(paging.limit)
      .exec(),
    Users.countDocuments(searchQuery).exec()
  ])

  return {
    items: user,
    totalItems: count
  }

}

async function findById(req, res) {
  let data = req.body.data;
  return await Users.findOne(data).populate([{ path: 'card', select: 'code' }, { path: 'pool' }]).exec();
}

async function findByCode(data) {
  const card = await Card.findOne({ code: data.code }).populate({ path: 'user', populate: { path: 'pool', populate: 'package' } });
  return card ? card.user : null;
}

async function findByIdWithPopulation(req, res) {
  let data = req.body.data;
  return await Users.findOne(data).populate(population('pool.group')).populate(population('pool.coach')).populate(population('pool.package')).exec();
}

async function letsGoSwimming(data) {
  let code = data.code;
  if (!code) return { error: "Code Required" };
  const cardUser = await findByCode(data)

  const visit = await Visit.addVisit(cardUser._id, cardUser.card, cardUser.pool._id, cardUser.pool.paymentKey);

  return cardUser;

}


async function userEdit(req, res) {
  let user = req.body.data,
    action = req.body.action;
  let isPackageEdit = false,
    changeType = null;
  if (action) {
    isPackageEdit = action.isPackageEdit;
    changeType = action.changeType;
  }
  if (!user || !user._id) return { error: "_id Required" }
  const userFound = await Users.findOne({ _id: user._id }).exec();
  if (!userFound) return { error: "User not Found!" }
  const updateQuery = {};
  if (user.profile && Object.keys(user.profile).length) {
    updateQuery.profile = user.profile;
  }
  if (user.contact && Object.keys(user.contact).length) {
    updateQuery.contact = user.contact;
  }
  if (user.pool && Object.keys(user.pool).length) {
    // user.pool.visited = user.pool.visited || 0;
    let pool = await Pool.createNewPool(user._id, user.pool, action.changeType);
    updateQuery.pool = pool._id;
  }
  if (user.card && Object.keys(user.card).length) {
    if (user.card.code) {
      const newCard = await Card.createNewCard(user._id, user.card.code)
      updateQuery.card = newCard._id;
    }
  }
  if (user.userGroupId) {
    updateQuery.userGroupId = user.userGroupId;
  }
  if (user.recordState || user.recordState === 0) {
    updateQuery.recordState = user.recordState;
  }
  if (user.isVerified) {
    updateQuery.isVerified = user.isVerified;
  }

  if (Object.keys(updateQuery).length !== 0) {
    Users.findOneAndUpdate({ _id: userFound._id }, { $set: updateQuery }).populate(population('pool.group')).populate(population('pool.coach')).populate(population('pool.package')).exec();
    if (isPackageEdit) {
      history.insert(req, constants.HISTORY.DATA_TYPE.USER, changeType, userFound);
    } else {
      history.insert(req, constants.HISTORY.DATA_TYPE.USER, constants.HISTORY.CHANGE_TYPE.USER_INFO, userFound);
    }
    return userFound;
  }
  return { result: 'Nothing Changed' };



}

async function userAdd(req, res) {
  let data = req.body.data;
  const user = await Users.findOne({ 'profile.pid': data.profile.pid }).exec();
  if (user) return { error: 'PID Exists!' }
  const newUser = new Users({
    userName: data.profile.pid,
    profile: data.profile,
    contact: data.contact,
    isVerified: true,
    userGroupId: constants.USER_GROUPS.USER,
    recordState: constants.RECORD_STATE.ACTIVE,
    password: md5(data.profile.pid.toString(), 'hex')
  });
  return await newUser.save();

}

module.exports = {
  userFind, findById, findByCode, findByIdWithPopulation, letsGoSwimming, userEdit, userAdd
};
