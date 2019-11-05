const express = require('express');
// const { body } = require('express-validator/check');
const shareHandleController = require('../controllers/shareHandle');

const router = express.Router();

router.post('/upload', shareHandleController.postAddShare);

router.get('/getFile', shareHandleController.getShareFile);

router.get('/shares', shareHandleController.getShares);

router.get('/ltp' , shareHandleController.getLtp);

router.post('/getSlope', shareHandleController.getSlope);

module.exports = router;