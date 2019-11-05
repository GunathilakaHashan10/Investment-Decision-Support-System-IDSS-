const express = require('express');
const router = express.Router();

const adsPublishController = require('../controllers/adsPublish');

router.post('/adPublish', adsPublishController.postPublishHomeAd);

router.post('/landAdPublish' , adsPublishController.postPublishLandAd);

module.exports  = router;