const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("User", userSchema);