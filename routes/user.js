const sessionRequired = require('../config/commons').sessionRequired;
const ctrl = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const response = require('../extra/responseHelper').response;

router.post('/edit', sessionRequired, userEdit);
router.post('/add', sessionRequired, userAdd);
router.post('/find', sessionRequired, userFind);
router.post('/findById', sessionRequired, findById);
router.post('/letsGoSwimming', sessionRequired, letsGoSwimming);
router.post('/findByCode', sessionRequired, findByCode);
router.post('/findById/population', sessionRequired, findByIdWithPopulation);


async function userEdit(req, res) {
    response(req, res, await ctrl.userEdit(req, res))
}

async function userAdd(req, res) {
    response(req, res, await ctrl.userAdd(req, res))
}


async function userFind(req, res) {
    response(req, res, await ctrl.userFind(req, res))
}

async function findById(req, res) {
    response(req, res, await ctrl.findById(req, res))
}

async function letsGoSwimming(req, res) {
    response(req, res, await ctrl.letsGoSwimming(req.body.data))
}

async function findByCode(req, res) {
    response(req, res, await ctrl.findByCode(req.body.data))
}

async function findByIdWithPopulation(req, res) {
    response(req, res, await ctrl.findByIdWithPopulation(req, res))
}
module.exports = router;
