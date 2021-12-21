const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { SALTROUNDS } = require('../constants');

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
        minlength: [3, 'Username cannot be with less then 3 characters'],
    },
    email: {
        type: String,
        required: true,
        validate: [/^[A-Za-z0-9]*@[A-za-z]+\.[A-Za-z]+$/],
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'Your password should be at least 5 characters'],
    }

})

userSchema.pre('save', function (next) {

    bcrypt.hash(this.password, SALTROUNDS)
        .then(hash => {

            this.password = hash;
            next()
        })

})

const User = mongoose.model('User', userSchema);

module.exports = User;