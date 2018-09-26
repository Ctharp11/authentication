// const User = require("../models/User");
// const passport = require('passport')
//   , FacebookStrategy = require('passport-facebook').Strategy;

// require('dotenv').config({path: '../../variables.env'})

// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/account"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     console.log(profile)
//     User.findOrCreate(user, function(err, user) {
//       if (err) { return done(err); }
//       done(null, user);
//     });
//   }
// ));

