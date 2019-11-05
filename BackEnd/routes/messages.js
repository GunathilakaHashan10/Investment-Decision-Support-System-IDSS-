const express = require('express');

const router = express.Router();

const messageController = require('../controllers/messageControl');

router.post('/sendMessage', messageController.storeMessages);

router.get('/getMessages', messageController.getMessages);

router.post('/setMessageViewed', messageController.setMessageViewed);


module.exports  = router;