const express = require('express');

const indexController = require('../controllers/indexHandle');

const router = express.Router();

router.post('/addIndex', indexController.postAddIndex);

router.get('/getIndex', indexController.getIndex);

router.get('/getIndexFile' , indexController.getIndexFile);

module.exports = router;