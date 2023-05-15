var express = require('express');
var router = express.Router();
const ctrl = require('../controllers/auth');
var sessionRequired = require('../config/commons').sessionRequired;
const response = require('../extra/responseHelper').response;

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.post('/retrieve/session', retrieveSession);


async function login(req, res) {
    response(req, res, await ctrl.login(req, res))
}

async function register(req, res) {
    response(req, res, await ctrl.register(req, res));
}

async function logout(req, res) {
    response(req, res, await ctrl.logout(req, res));
}

async function retrieveSession(req, res) {
    response(req, res, await ctrl.retrieveSession(req, res));
}
module.exports = router;
