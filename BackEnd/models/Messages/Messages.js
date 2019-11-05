const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const messageSchema = new Schema({
    publisherId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [{
        sender: {type: Schema.Types.ObjectId, ref: 'User'},
        adId: {type: Schema.Types.ObjectId},
        adType: {type: String},
        message: {type: String},
        date: {type: Date},
        isViewed: {type: Boolean},
        reply: [{
            text: {type: String},
            replyDate: {type: Date}
        }]

    }]

})

module.exports = mongoose.model('Message', messageSchema)



