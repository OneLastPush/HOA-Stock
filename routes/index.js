const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const StockPorfolio = require('../models/StockPorfolio')

//@desc     Login/Landing page
//@route    GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

//@desc     Dashboard
//@route    GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const stockPorfolio = await StockPorfolio.findOne({ user: req.user.id }).lean()

        res.render('dashboard', {
            name: req.user.firstName,
            stockPorfolio
        })
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }


})

module.exports = router