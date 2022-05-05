module.exports = {
    calculateStock : async function () {
        const StockValue = require('../models/StockValue')

        await StockValue.create({
            value: Math.random(),
            date: Date.now(),
            stock: 'Siz'
        })

        await StockValue.create({
            value: Math.random(),
            date: Date.now(),
            stock: 'Andi'
        })

    }
}