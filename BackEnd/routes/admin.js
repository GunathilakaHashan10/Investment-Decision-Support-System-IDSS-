const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();

const adminController = require('../controllers/adminControl');

router.get('/adminShares', adminController.getAdminShareDetails);

router.post('/deleteShare', adminController.deleteShare);

router.post('/deleteData', adminController.deleteShareData);

router.get('/getAdvertisers', adminController.retriveAdvertisers);

router.get('/getPublisherAds', adminController.getPublisherAds);

router.post('/controlBlockAd', adminController.controlBlockAds);

router.get('/controlUnblock', adminController.controlUnblockAd);

router.post('/addBankNew', adminController.addBank);

router.post('/addBankImage', adminController.postBankImage);

module.exports  = router;