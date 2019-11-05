const express = require('express');

const router  = express.Router();

const bankController = require('../controllers/bank');

router.post('/add-bank', bankController.postAddBank);
router.post('/get-banks', bankController.postGetAllBanks);
router.post('/update-bank', bankController.postUpdateBank);
router.post('/delete-bank', bankController.postDeleteBank);
router.post('/get-bank', bankController.postGetSpecificBank);
router.post('/get-bank-ir', bankController.postGetSpecificBankInterestRates);

module.exports = router;