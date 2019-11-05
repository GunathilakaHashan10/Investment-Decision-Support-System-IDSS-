const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const landAdsSchema = new Schema({
    publishTime: {
        type: Date,
        required: true
    },
    publisherId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    landType: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    areaOfLand: {
        type: Number,
        required: true
    },
    propertyDetails: {
        type: String,
        required: true
    },
    landImages: [{
        imageName: {type: String, required: false },
        imagePath: {type: String, required: false }
    }]
});

module.exports = mongoose.model('LandAds', landAdsSchema);