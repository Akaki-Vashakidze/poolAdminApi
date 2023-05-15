const sessionRequired = require('../config/commons').sessionRequired;
const ctrl = require('../controllers/groupController');
const express = require('express');
const response = require('../extra/responseHelper').response;
var router = express.Router();

router.post('/add', sessionRequired, add);
router.post('/find', find);
router.post('/findByCoach', sessionRequired, findByCoach);
router.post('/delete', sessionRequired, deleteGroup);


async function add(req, res) {
    response(req, res, await ctrl.add(req, res))
}

async function find(req, res) {
    response(req, res, await ctrl.find(req, res))
}

async function findByCoach(req, res) {
    response(req, res, await ctrl.findByCoach(req, res))
}

async function deleteGroup(req, res) {
    response(req, res, await ctrl.deleteGroup(req, res))
}


module.exports = router;
