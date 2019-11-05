const mongoose = require('mongoose');
const Messages = require('../models/Messages/Messages');
const User = require('../models/auth/User');


exports.storeMessages = (req, res, next) => {
    const publisherId = req.body.publisherId;
    const senderId = req.body.senderId;
    const adId = req.body.adId;
    const adVersion = req.body.adVersion;
    const date = req.body.date;
    const message = req.body.message;


    Messages.find({ publisherId: publisherId })
            .then(result => {
                if(result.length === 0) {
                    const newMessageArea = new Messages({
                        publisherId: publisherId,
                        messages: [{
                            sender: new mongoose.Types.ObjectId(senderId),
                            adId: adId,
                            adType: adVersion,
                            message: message,
                            date: date,
                            isViewed: false
                        }]
                    })
                   return newMessageArea.save().then(() => {
                        res.json({success: true}) 
                   });
                } else {
                    const newMessage = {
                        sender: senderId,
                        adId: adId,
                        adType: adVersion,
                        message: message,
                        date: date,
                        isViewed: false
                    }
                    Messages.update(
                        {publisherId: publisherId},
                        {$push: {messages: {$each: [newMessage]}}},
                        {upsert:true},
                        function(error) {
                            if(error) {
                              next(error);
                            } else {
                                res.json({success: true}) 
                            }
                    }
                    ) 
                }
            })
            .catch(error => {
                return next(error);
            })
}


exports.getMessages = (req, res, next) => {
    const publisherId = req.query.pId;
    let messages = [];
    
    
    Messages
        .findOne({publisherId:publisherId})
        .populate('messages.sender')
        .then(message => {
            if(!message) {
                throw new Error('No messages');
            }
            message.messages.forEach((value, index) => {
                const messageDetails = {
                    _id: value._id,
                    message:value.message,
                    senderName: `${value.sender.firstName} ${value.sender.lastName}`,
                    adId: value.adId,
                    adType: value.adType,
                    date: value.date,
                    isViewed: value.isViewed,
                    reply: value.reply
                }
                messages.push(messageDetails);
            })
            res.json(messages)
        })
        .catch(error => {
            return next(error);
        })
        
}

exports.setMessageViewed = (req, res, next) => {
    const publisherId = req.body.pId;
    const messageId = req.body.messageId;

    Messages
        .findOne({publisherId:publisherId})
        .then(message => {
            if(!message) 
                throw new Error('Internal error');

            message.messages.forEach(value => {
                if(JSON.stringify(value._id) === JSON.stringify(messageId)) {
                    value.isViewed = true;
                    message.save();
                    
                }
            })
        })
        .catch(error => {
            return next(error);
        })
}

// .exec(function(err, message) {
//     if(!message) {
//         throw new Error('No messages');
//     }
//     if(err) next(err);
//     message.messages.forEach((value, index) => {
//         const messageDetails = {
//             message:value.message,
//             senderName: `${value.sender.firstName} ${value.sender.lastName}`,
//             adId: value.adId,
//             adType: value.adType,
//             date: value.date,
//             isViewed: value.isViewed,
//             reply: value.reply
//         }
//         messages.push(messageDetails);
//     })
//     res.json(messages)
// })


