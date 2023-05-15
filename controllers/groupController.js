const Group = require('../model/group');
const Users = require('../model/user');
const Coach = require('../model/coach');
const ObjectId = require('mongodb').ObjectID;
const constants = require('../extra/constants');

async function add(req, res) {
  let group = req.body.data;
  if (!group || !group.name) {
    return { error: "Fill All Required Fields" };
  }
  return await new Group(group).save();
}

async function findByCoach(req, res) {
  let coachId = req.body.data.coachId;
  const coach = await Coach.findOne({ recordState: 1, _id: ObjectId(coachId) }).populate({
    path: 'pool.groups',
    match: { recordState: constants.RECORD_STATE.ACTIVE },
    populate: {
      path: 'parentId',
      match: { recordState: constants.RECORD_STATE.ACTIVE },
    }
  }).exec();
  let groups = [];
  if (coach && coach.pool && coach.pool.groups && coach.pool.groups.length) {
    groups = coach.pool.groups;
  }
  return groups;
}

async function find(req, res) {
  let group = req.body.data;
  return await Group.find({ recordState: 1 }).exec();

}

async function deleteGroup(req, res) {
  let group = req.body.data;
  const updateQuery = {
    recordState: constants.RECORD_STATE.DELETED
  };

  const toDelete = await Group.find({ parentId: group.id, recordState: constants.RECORD_STATE.ACTIVE }).exec();
  if (toDelete.length) return { error: 'აღნიშნულ ჯგუფს აქვს შვილი ჯგუფ(ებ)ი' }
  const users = await  Users.find({ recordState: constants.RECORD_STATE.ACTIVE, 'pool.group': ObjectId(group.id), 'pool.active': true}).exec();
    if (users.length) {
      let resString = users.length + " მომხმარებელი კვლავ არის ამ ჯფუგის წევრი; შესაბამისად წაშლა ვერ განხორციელდება";
      return { error: resString };
    }
    return await Group.updateMany({ $or: [{ _id: ObjectId(group.id) }, { parentId: group.id }] }, { '$set': updateQuery }, {
      multi: true
    }).exec();
}
module.exports = {
  add,
  findByCoach,
  find,
  deleteGroup
}
