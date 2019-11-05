const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shareSchema = new Schema({
    shareName: {
        type: String,
        required: true
    },
    shareTag: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    ltp: [{
        date: {
            type: String,
            required: false
        },
        open: {
            type: Number,
            required: false
        },
        high: {
            type: Number,
            required: false
        },
        low: {
            type: Number,
            required: false
        },
        close: {
            type: Number,
            required: false
        },
        adjClose: {
            type: Number,
            required: false
        },
        volume: {
            type: Number,
            required: false
        }
    }]
});

module.exports = mongoose.model('Share', shareSchema);