const sessionRequired = require('../config/commons').sessionRequired;
const ctrl = require('../controllers/packageController');
const express = require('express');
const router = express.Router();
const response = require('../extra/responseHelper').response;

router.post('/add', sessionRequired, add);
router.post('/findAll', findAll);
router.post('/find', find);
router.post('/edit', sessionRequired, edit);


async function add(req, res) {
    response(req, res, await ctrl.add(req, res))
}

async function findAll(req, res) {
    response(req, res, await ctrl.findAll(req, res))
}


async function find(req, res) {
    response(req, res, await ctrl.find(req, res))
}

async function edit(req, res) {
    response(req, res, await ctrl.edit(req, res))
}

module.exports = router;
