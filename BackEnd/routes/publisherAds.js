const express = require('express');

const router = express.Router();

const publisherAdsController = require('../controllers/publisherAds');

router.get('/publisherAllAds', publisherAdsController.getAllPublisherAds);

router.post('/deleteAd', publisherAdsController.deleteAd);

router.post('/updateAd', publisherAdsController.updateAd);

module.exports = router;