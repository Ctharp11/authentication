const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const { ExtractJwt } = require('passport-jwt');
const { 
    JWT_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    FB_CLIENT_ID,
    FB_CLIENT_SECRET
} = require('./config');
const User = require('./models/user');


//passport-jwt
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        //find the user specified in token
        const user = await User.findById(payload.sub);
        //if user doesn't exist, handle it
        if (!user) {
            return done(null, false);
        }
        //otherwise, return the user
        done(null, user);
    }
    catch(err) {
        done(err, false)
    }
}))

//passport-local
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        //find user given the email
        const user = await User.findOne({ "local.email": email });
        //handle error: no email found 
        if (!user) {
            return done(null, false);
        }
        //check if password is correct
        const isMatch = await user.isValidPassword(password)
        //handle error: incorrect password
        if (!isMatch) {
            return done(null, false)
        }
        //otherwise, return user
        done(null, user)
    }
    catch(err) {
        done(err, false)
    }
}))

//passport-google-plus-oauth
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(accessToken, refreshToken, profile);
        //check if this current user exists in our database
        const existingUser = await User.findOne({ 'google.id': profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        //if new account 
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value,
                photo: profile.photos[0].value
            }
        })
        await newUser.save();
        done(null, newUser);
    }
    catch(err) {
        done(err, false, err.message);
    }
}));

//passport gmail
passport.use('gmailToken', new GoogleTokenStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken, profile)
}));

//passport facebook
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: FB_CLIENT_ID,
    clientSecret: FB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        //check if this current user exists in our database
        const existingUser = await User.findOne({ "facebook.id": profile.id })
        if (existingUser) {
            return done(null, existingUser);
        }
        //if not save new user
        const newUser = new User({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value,
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                photo: profile.photos[0].value
            }
        })
        await newUser.save();
        done(null, newUser);
    }
    catch(err) {
        done(err, false, err.message)
    }
}));


