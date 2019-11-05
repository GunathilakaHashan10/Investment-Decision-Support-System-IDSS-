const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const homeAdsSchema = new Schema({
    publishTime: {
        type: Date,
        required: true
    },
    publisherId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    propertyType: { 
        type: String,
        required: true
    },
    sellOrRent: { 
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
    bedRooms: {
        type: Number,
        required: true
    },
    bathRooms: {
        type: Number,
        required: true
    },
    floors: {
        type: Number,
        required: true 
    },
    parkingSpace: {
        type: Number,
        required: true 
    },
    landSize: {
        type: Number,
        required: true  
    },
    AC: { type: Boolean },
    hotWater: { type: Boolean },
    mainLineWater: { type: Boolean },
    overHeadWater: { type: Boolean },
    serventRoom: { type: Boolean },
    serventToilet: { type: Boolean },
    propertyDescription: { type: String },
    homeImages: [{
            imageName: {type: String, required: false },
            imagePath: {type: String, required: false }
        }]
    
});

module.exports = mongoose.model('HomeAds', homeAdsSchema);