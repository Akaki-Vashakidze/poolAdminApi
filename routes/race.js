const sessionRequired = require('../config/commons').sessionRequired;
const ctrl = require('../controllers/raceController');
const express = require('express');
const response = require('../extra/responseHelper').response;
const router = express.Router();

router.post('/add', sessionRequired, add);
router.post('/addMany', sessionRequired, addMany);
router.post('/find', sessionRequired, find);
router.post('/edit', sessionRequired, edit);
router.post('/participant/add', sessionRequired, participantAdd);


async function add(req, res) {
    response(req, res, await ctrl.add(req, res))
}

async function addMany(req, res) {
    response(req, res, await ctrl.addMany(req, res))
}


async function find(req, res) {
    response(req, res, await ctrl.find(req, res))
}

async function edit(req, res) {
    response(req, res, await ctrl.edit(req, res))
}

async function participantAdd(req, res) {
    response(req, res, await ctrl.participantAdd(req, res))
}


module.exports = router;
