const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const indexSchema = new Schema({
    indexName: {
        type: String,
        required: true
    },
    indexTag: {
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
    }
});

module.exports = mongoose.model('Index', indexSchema);