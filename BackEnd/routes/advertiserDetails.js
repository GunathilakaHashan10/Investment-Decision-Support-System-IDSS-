const express = require('express');
const router = express.Router();

const advertiserController = require('../controllers/advertiserDetails');

router.post('/registerAdvertiser', advertiserController.registerAdvertiser);

router.get('/checkIsAdvertiser' , advertiserController.checkIsAdvertiser);

router.get('/advertiserDetails', advertiserController.getAdvertiserDetails);

module.exports  = router;