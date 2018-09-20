const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getHome = (req, res) => {
    res.send({ it: 'works'});
}