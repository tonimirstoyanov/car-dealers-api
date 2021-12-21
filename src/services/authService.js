const User = require('../models/User')
const bcrypt = require('bcrypt')
const { JWT_SECRET, AUTH_COOKIE_NAME } = require('../constants')
const { sign } = require('../utils/jwt')

exports.register = (data) => User.create(data)

exports.checkExistEmail = (data) => User.findOne({ email: data });

exports.login = async ({ email, password }) => {

    let user = await User.findOne({ email })

    // console.log(user)
    if (user) {

        let isValid = await bcrypt.compare(password, user.password)

        // console.log(isValid)
        if (isValid) {
            // console.log(user)
            return user
        } else {
            throw new Error('Email or password are invalid')
        }
    } else {
        throw new Error('Email or password are invalid')
    }
}

exports.createToken = (user) => {

    let payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,

    }

    return sign(payload, JWT_SECRET)
}

