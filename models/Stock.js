const mongoose = require('mongoose')
const StockValue = require('./StockValue')

const StockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    codeName: {
        type: String,
        required: true,
    }
    
})

module.exports = mongoose.model('Stock', StockSchema)