const path = require('path')
const express = require("express")
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const morgan = require('morgan')

const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

//Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))
// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars helper
const { formatDate, truncate, stripTags, editIcon, select } = require('./helpers/hbs')

// Handlebars
app.engine(
    '.hbs',
    exphbs.engine({
        helpers: {
            formatDate,
            truncate,
            stripTags,
            editIcon,
            select,
        },
        defaultLayout: 'main',
        extname: '.hbs',
    })
)
app.set('view engine', '.hbs')

// Sessions 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global variable
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 3000

const { someAsyncOperation } = require('./stockProcessing/valueCalculation')
const { Console } = require('console')

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))


const { getTwitchToken, connectToTwitch } = require('./api/TwitchWebSocket')

getTwitchToken(process.env.TWITCH_CLIENT_ID, process.env.TWITCH_CLIENT_SECRET, process.env.TWITCH_GET_TOKEN, (err, body) => {
    if(body)
        connectToTwitch(body.access_token, process.env.TWITCH_CLIENT_ID)

    if(err)
        console.error(err)
})

/*Stock.create({
    name: 'AntStock',
    codeName: 'ANT'
})*/

/*
// Calculating stock value
 setInterval( async () => {
    const stockSiz = await Stock.findOne({
        codeName: 'SIZ'
    }).lean()

    await StockValue.create({
        value: Math.random(),
        stock: stockSiz
    })

    const stockAnt = await Stock.findOne({
        codeName: 'ANT'
    }).lean()

    await StockValue.create({
        value: Math.random(),
        stock: stockAnt
    })
}, 5000)*/
