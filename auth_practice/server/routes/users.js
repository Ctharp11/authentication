const express = require('express');
const router = require('express-promise-router')();
const { validateBody, schemas } = require('../helpers/routerHelpers');
const userControllers = require('../controllers/users');
const passport = require('passport');
const passportConf = require('../passport');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,Credentials");
    next();
});

router.route('/signup')
    .post(validateBody(schemas.authSchema), userControllers.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), passport.authenticate('local', { session: false }), userControllers.signIn);

router.route('/secret')
    .get(passport.authenticate('jwt', { session: false }), userControllers.secret);

router.route('/oauth/google')
    .post(passport.authenticate('googleToken', { session: false }), userControllers.googleOAuth)

router.route('/oauth/gmail')
    .post(passport.authenticate('gmailToken', { session: false }))

router.route('/oauth/facebook')
    .post(passport.authenticate('facebookToken', { session: false }), userControllers.facebookOAuth)

router.route('/test')
    .post(userControllers.test);

router.route('/data')
    .get(userControllers.getUserData);


module.exports = router;
