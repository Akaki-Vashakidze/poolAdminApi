const sessionRequired = require('../config/commons').sessionRequired;
const ctrl = require('../controllers/eventController');
const express = require('express');
const response = require('../extra/responseHelper').response;
const router = express.Router();

router.post('/add', sessionRequired, add);
router.post('/find', sessionRequired, find);
router.post('/findMyEvents', sessionRequired, findMyEvents);
router.post('/participantAdd', sessionRequired, participantAdd);
router.post('/edit', sessionRequired, edit);
router.post('/findById', sessionRequired, findById);

async function add(req, res) {
    response(req, res, await ctrl.add(req, res))
}

async function find(req, res) {
    response(req, res, await ctrl.find(req, res))
}

async function findMyEvents(req, res) {
    response(req, res, await ctrl.findMyEvents(req, res))
}

async function participantAdd(req, res) {
    response(req, res, await ctrl.participantAdd(req, res))
}


async function edit(req, res) {
    response(req, res, await ctrl.edit(req, res))
}


async function findById(req, res) {
    response(req, res, await ctrl.findById(req, res))
}

module.exports = router;
