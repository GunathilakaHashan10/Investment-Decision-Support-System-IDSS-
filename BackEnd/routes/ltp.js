const express = require('express');

const router = express.Router();

const Ltpcontroller = require('../controllers/ltp');

router.post('/addLtp', Ltpcontroller.postLtp );

router.post('/ltp', Ltpcontroller.addLtp);


module.exports  = router;