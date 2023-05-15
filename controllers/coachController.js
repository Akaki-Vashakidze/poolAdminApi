const md5 = require('crypto-md5');
const Coaches = require('../model/coach');
const responseHelper = require('../extra/responseHelper');
const constants = require('../extra/constants');

const population = function (key) {
  return {
    path: key,
    match: { recordState: constants.RECORD_STATE.ACTIVE }
  }
};

async function find(req, res) {
  const data = req.body.data;
  const searchQuery = {
    userGroupId: constants.USER_GROUPS.COACH
  };
  Object.keys(data).forEach(key => {
    searchQuery[key] = data[key] || null;
  });
  return await Coaches.find(searchQuery).populate(population('pool.groups')).exec();
}

async function findById(req, res) {
  let data = req.body.data;
  let coach = null;
  try{
    coach = await Coaches.findOne(data)
  } catch(error){
    console.log(error)
  }
  return coach;
}
async function add(req, res) {
  const data = req.body.data;
  const newCoach = new Coaches({
    userName: data.profile.pid,
    profile: data.profile,
    contact: data.contact,
    pool: data.pool,
    isVerified: true,
    userGroupId: constants.USER_GROUPS.COACH,
    recordState: constants.RECORD_STATE.ACTIVE,
    password: md5(data.profile.pid.toString(), 'hex')
  }).save();
  return newCoach;
}

async function edit(req, res) {
  let coach = req.body.data;
  if (!coach || !coach._id) {
    return { error: "_id Required" };
  }
  const coachFound = Coaches.findOne({ _id: coach._id }).exec();
  if (!coachFound) return { error: "Coach Not Found!" };
  const updateQuery = {};
  if (coach.profile && Object.keys(coach.profile).length) {
    updateQuery.profile = coach.profile;
  }
  if (coach.pool && Object.keys(coach.pool).length) {
    updateQuery.pool = coach.pool;
  }
  if (coach.contact && Object.keys(coach.contact).length) {
    updateQuery.contact = coach.contact;
  }
  if (coach.userGroupId) {
    updateQuery.userGroupId = coach.userGroupId;
  }
  if (coach.recordState || coach.recordState === 0) {
    updateQuery.recordState = coach.recordState;
  }
  if (coach.isVerified) {
    updateQuery.isVerified = coach.isVerified;
  }

  if (Object.keys(updateQuery).length !== 0) {
    return await Coaches.updateOne({ _id: coach._id }, updateQuery, { new: true }).exec();
  } else {
    return { result: 'Nothing Changed' }
  }
}

module.exports = {
  find, findById, edit, add
};
