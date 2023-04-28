const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/users')
module.exports = app => {
  // 初始化
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登錄策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'This email is not registered!' })
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, { message: 'Email or Password incorrect!' })
          }
          return done(null, user)
        })
      })
      .catch(error => done(error, false))
  }))
  passport.use(new FacebookStrategy({
    clientID: 'myClientID',
    clientSecret: 'myClientSecret',
    callbackURL: 'http://localhost:3001/auth/facebook/callback',
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
  }))
  // 設定序列化和反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(error, false))
  })
}

