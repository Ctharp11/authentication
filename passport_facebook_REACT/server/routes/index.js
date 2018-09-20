const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const User = require("../models/User");
const passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

require('dotenv').config({path: '../../variables.env'})

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/account"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('accessToken', accessToken)
    console.log('refreshToken', refreshToken)
    console.log('profile',profile)
    // User.findOrCreate(user, function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
  }
));

router.get('/', userController.getHome);

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/account',
                                      failureRedirect: '/login' }));

module.exports = router;

