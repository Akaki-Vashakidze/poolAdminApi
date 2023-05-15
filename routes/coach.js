const sessionRequired = require('../config/commons').sessionRequired;
const ctrl = require('../controllers/coachController');
const express = require('express');
const response = require('../extra/responseHelper').response;
const router = express.Router();

router.post('/add', sessionRequired, add);
router.post('/findById', sessionRequired, findById);
router.post('/find', find);
router.post('/edit', sessionRequired, edit);

async function add(req, res) {
    response(req, res, await ctrl.add(req, res))
}

async function findById(req, res) {
    response(req, res, await ctrl.findById(req, res))
}

async function find(req, res) {
    response(req, res, await ctrl.find(req, res))
}

async function edit(req, res) {
    response(req, res, await ctrl.edit(req, res))
}
module.exports = router;
