const express = require('express');

const shareComparisonController = require('../controllers/shareComparison');

const router = express.Router();

router.post('/getSlopeResults' , shareComparisonController.getSlopeResults);

router.get('/getDates', shareComparisonController.getDate);

router.post('/getExpectedReturn' ,shareComparisonController.getExpectedReturnForOneShare);

router.post('/getExpectedReturnOfAllShares', shareComparisonController.getExpectedReturnForAllShare);

module.exports = router;