const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const LPIschema = new Schema({
    district: { type:String, required: true },
    year: { type:Number, required: true },
    LPI_1: { type:Number, required: true },
    LPI_2: { type:Number, required: true }
})

module.exports = mongoose.model('lpi', LPIschema)