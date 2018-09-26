const User = require('../models/user');
const JWT = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

signToken = user => {
    return JWT.sign({
        iss: 'CodeWorkr',
        sub: user._id,
        iat: new Date().getTime(), //current time 
        exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day ahead
    }, JWT_SECRET );
}

module.exports = {
    signUp: async (req, res, next) => {
        const { email, password } = req.value.body;

        //check if user exists 
        const foundUser = await User.findOne({ "local.email": email });
        if (foundUser) {
            return res.status(403).json({ error: 'User already exists' });
        }

        //create new user
        const newUser =  new User({
            method: "local",
            local: {
                email,
                password
            }
        })
        await newUser.save();
        const token = signToken(newUser);
        //respond with token
        res.status(200).json({ token });
    },
    signIn: async (req, res, next) => {
        //generate token
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    googleOAuth: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    facebookOAuth: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    secret: async (req, res, next) => {
        console.log(req.user);
        res.json({userInfo: req.user});
    },
    test: async (req, res, next) => {
        console.log(req.body);
        res.status(200).json({ recieved: req.body })
    },
    getUserData: async (req, res, next) => {
        res.status(200).json({ recieved: 'req.body' })
    }
}