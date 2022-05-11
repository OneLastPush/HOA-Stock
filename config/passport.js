const GoogleStrategy = require('passport-google-oauth20').Strategy
const TwitchStrategy = require('twitch-oauth-passport').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')
const StockPorfolio = require('../models/StockPorfolio')

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                apiId: profile.id,
                apiType: 'Google',
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value
            }
            try {
                let user = await User.findOne({ apiId: profile.id, apiType: 'Google' })

                if (user) {
                    done(null, user)
                } else {
                    user = await User.create(newUser)
                    done(null, user)
                }
            } catch (err) {
                console.log(err)
            }
        }))

    passport.use(new TwitchStrategy({
        clientID: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_CLIENT_SECRET,
        callbackURL: '/auth/twitch/callback',
        scope: 'user_read'
    },
        async (accessToken, refreshToken, profile, done) => {
            
            const newUser = {
                apiId: profile.id,
                apiType: 'Twitch',
                displayName: profile.displayName,
                firstName: profile.userName,
                image: profile.profileImageUrl
            }

            try {
                let user = await User.findOne({ apiId: profile.id, apiType: 'Twitch' })

                if (user) {
                    done(null, user)
                } else {
                    user = await User.create(newUser)
                    
                    const newPorfolio = {
                        hoaCoin: 10,
                        sizStock: 1,
                        andiStock: 1,
                        stanleyStock: 30,
                        user : user,
                    }
                    await StockPorfolio.create(newPorfolio)

                    done(null, user)
                }
            } catch (err) {
                console.log(err)
            }
        }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })

}