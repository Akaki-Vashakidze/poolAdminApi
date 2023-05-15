const Race = require('../model/race');
const responseHelper = require('../extra/responseHelper');
const ObjectId = require('mongodb').ObjectID;
const constants = require('../extra/constants');


async function add(req, res) {
    let race = req.body.data;
    if (!race || !race.title || !race.distance || !race.sex) {
        return { error: "Fill All Required Fields" };
    } else {
        var newRace = new Race(race);
        newRace.authorUserId = req.session.userId;
        return await newRace.save();

    }
}

async function addMany(req, res) {
    let data = req.body.data,
        races = data.races;
    races.forEach((race, index) => {
        if (!race || !race.title || !race.event || !race.distance || !race.sex) {
            return { error: "Fill All Required Fields" };
        }
        if (race._id) {
            Race.findOneAndUpdate({ '_id': ObjectId(race._id) }, { $set: race }).exec();
        } else {
            var newRace = new Race(race);
            newRace.authorUserId = req.session.userId;
            newRace.save();
        }
        if (index === races.length - 1) {
            return races;
        }
    });

}
async function find(req, res) {
    let race = req.body.data;
    return await Race.find({ event: race.event, recordState: constants.RECORD_STATE.ACTIVE });
}
async function edit(req, res) {
    let race = req.body.data;
    if (!race || !race._id) {
        return { error: "_Id Required" };
    }
    const raceToUpdate = await Race.findOne({ _id: race._id }).exec();

    const updateQuery = {};

    if (race.title) {
        updateQuery.title = race.title;
        raceToUpdate.title = race.title;
    }
    if (race.distance) {
        updateQuery.distance = race.distance;
        raceToUpdate.distance = race.distance;
    }
    if (race.sex) {
        updateQuery.sex = race.sex;
        raceToUpdate.sex = race.sex;
    }
    if (race.isSelection) {
        updateQuery.isSelection = race.isSelection;
        raceToUpdate.isSelection = race.isSelection;
    }
    if (race.participants) {
        updateQuery.participants = race.participants;
        raceToUpdate.participants = race.participants;
    }
    if (race.recordState || race.recordState === 0) {
        updateQuery.recordState = race.recordState;
        raceToUpdate.recordState = race.recordState;
    }

    if (Object.keys(updateQuery).length !== 0) {
        const updated = await Race.updateOne({ _id: raceToUpdate._id }, updateQuery, { new: true }).exec();
        if (updated['nModified']) return updated['nModified'];
        return updated;

    }
    return { result: 'Nothing Changed' };
}

async function participantAdd(req, res) {
    let data = req.body.data,
        rc = data.race,
        participants = data.participants;
    if (!rc || !rc._id || !participants) {
        return { error: "Fill All Required Fields" };
    }
    if (!participants.length) {
        return { error: "Please add One or More Participant" }
    }
    const race = Race.findOne({ _id: rc._id }).exec();
    participants.forEach(participant => {
        race.participants[participant.lane] = participant;
    });
    return await race.save();
}
module.exports = {
    add,
    addMany,
    find,
    edit,
    participantAdd
}