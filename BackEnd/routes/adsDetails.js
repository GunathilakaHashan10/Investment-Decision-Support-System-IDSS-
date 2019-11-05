const express = require('express');

const router = express.Router();

const adsDetailsController = require('../controllers/adsDetails');

router.get('/homeAdsSell', adsDetailsController.getHomeAdsSell);

router.get('/homeAdsRent', adsDetailsController.getHomeAdsRent);

router.get('/LandAds', adsDetailsController.getLandAds);

module.exports  = router;