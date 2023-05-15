const sessionRequired = require('../config/commons').sessionRequired;
const ctrl = require('../controllers/historyController');
const express = require('express');
const router = express.Router();
const response = require('../extra/responseHelper').response;

router.post('/find/user', sessionRequired, findUserInfo);
router.post('/find/pool', sessionRequired, findPool);

async function findUserInfo(req, res) {
    response(req, res, await ctrl.findUserInfo(req, res))
}

async function findPool(req, res) {
    response(req, res, await ctrl.findPool(req, res))
}

module.exports = router;
