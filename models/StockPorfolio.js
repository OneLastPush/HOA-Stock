const mongoose = require('mongoose')

const StockPorfolioSchema = new mongoose.Schema({
    hoaCoin: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    sizStock: {
        type: Number,
        default: 0,
        min: 0
    },
    andiStock: {
        type: Number,
        default: 0,
        min: 0
    },
    julioStock: {
        type: Number,
        default: 0,
        min: 0
    },
    drlStock: {
        type: Number,
        default: 0,
        min: 0
    },
    stanleyStock: {
        type: Number,
        default: 0,
        min: 0
    },
    kermyStock: {
        type: Number,
        default: 0,
        min: 0
    },
    lilithStock: {
        type: Number,
        default: 0,
        min: 0
    },
    freddyStock: {
        type: Number,
        default: 0,
        min: 0
    },
    gilleaStock: {
        type: Number,
        default: 0,
        min: 0
    },
    lexiStock: {
        type: Number,
        default: 0,
        min: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('StockPorfolio', StockPorfolioSchema)