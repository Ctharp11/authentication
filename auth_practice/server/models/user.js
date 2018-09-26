const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        photo: {
            type: String
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        photo: {
            type: String
        }
    }
})

//If only using local strategy, email and password above need require: true, and email needs unique: true

userSchema.pre('save', async function(next) {
    try {
        if (this.method !== 'local') {
            next();
        }
        //generate salt
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(this.local.password, salt)
        this.local.password = passHash;
        next();
    }
    catch(err) {
        next(err)
    }
})

userSchema.methods.isValidPassword = async function(newPassword) {
    try {
        //compare('plain text password', 'hashed password')
        //returns boolean
        return await bcrypt.compare(newPassword, this.local.password)
    }
    catch(err) {
        throw new Error(err)
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
