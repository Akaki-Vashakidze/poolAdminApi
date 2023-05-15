const Event = require('../model/event');
const responseHelper = require('../extra/responseHelper');


async function add(req, res) {
    let event = req.body.data;
    if (!event || !event.name || !event.startDate || !event.endDate) {
        return { error: "Fill All Required Fields" };
    }
    var newEvent = new Event(event);
    newEvent.authorUserId = req.session.userId;
    return await newEvent.save();
}

async function find(req, res) {
    let data = req.body.data,
        event = data.event;
    return await Event.find({ recordState: 1 });
}
async function edit(req, res) {
    let event = req.body.data;
    if (!event || !event._id) {
        return { error: "_Id Required" };
    }
    const evFound = Event.findOne({ _id: event._id }).exec();
    if (!evFound) return { error: "Event Not Found!" }
    updateQuery = {};

    if (event.name) {
        updateQuery.name = event.name;
        evFound.name = event.name;
    }
    if (event.description) {
        updateQuery.description = event.description;
        evFound.description = event.description;
    }
    if (event.startDate) {
        updateQuery.startDate = event.startDate;
        evFound.startDate = event.startDate;
    }
    if (event.endDate) {
        updateQuery.endDate = event.endDate;
        evFound.endDate = event.endDate;
    }
    if (event.location) {
        updateQuery.location = event.location;
        evFound.location = event.location;
    }
    if (event.recordState || event.recordState === 0) {
        updateQuery.recordState = event.recordState;
        evFound.recordState = event.recordState;
    }

    if (Object.keys(updateQuery).length !== 0) {
        return await Event.updateOne({ _id: evFound._id }, updateQuery, { new: true }).exec();
    }
    return { result: 'Nothing Changed' };
}

async function participantAdd(req, res) {
    let data = req.body.data;
    const event = await Event.findOne({ _id: data._id }).exec();
    let fps = event.participants.filter(id => id == data.userId);
    if (fps.length > 0) {
        return event
    }
    event.participants.push(data.userId);
    return await event.save();
}

async function findById(req, res) {
    let data = req.body.data;
    return await Event.findOne(data);
}

async function findMyEvents(req, res) {
    let data = req.body.data,
        paging = req.body.paging;
    const [event, count] = await Promise.all([
        Event.find({ participants: data.participant }, {}, { skip: paging.page, limit: paging.size }).exec(),
        Event.find({ participants: data.participant }).count().exec()
    ]);

    return {
        data: event,
        count: count
    }
}
module.exports = {
    participantAdd,
    add,
    find,
    edit,
    findById,
    findMyEvents
}
