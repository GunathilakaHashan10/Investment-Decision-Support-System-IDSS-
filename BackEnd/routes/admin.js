const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();

const adminController = require('../controllers/adminControl');

router.get('/adminShares', adminController.getAdminShareDetails);

router.post('/deleteShare', adminController.deleteShare);

router.post('/deleteData', adminController.deleteShareData);

module.exports  = router;