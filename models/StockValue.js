const mongoose = require('mongoose')

const StockValueSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
    },
    
})

module.exports = mongoose.model('StockValue', StockValueSchema)