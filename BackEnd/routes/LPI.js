const express = require('express');

const router = express.Router();

const lpiController = require('../controllers/LPIcontroller');

router.post('/get-lpi', lpiController.sendLPIvalue);

module.exports  = router;