const ctrl = require('../controllers/fileController');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const response = require('../extra/responseHelper').response;

router.post('/upload', upload.any(), fileUpload);
router.post('/get', get);

async function fileUpload(req, res) {
    response(req, res, await ctrl.upload(req, res))
}

async function get(req, res) {
    response(req, res, await ctrl.get(req, res))
}


module.exports = router;
