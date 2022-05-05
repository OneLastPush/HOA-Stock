const Stock = require('./models/Stock')
const StockValue = require('./models/StockValue')

const { connectToTwitch } = require('./api/TwitchApi')

connectToTwitch()