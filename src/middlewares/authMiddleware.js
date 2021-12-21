const jwt = require('jsonwebtoken')
const { verify } = require('../utils/jwt')
const { JWT_SECRET, AUTH_COOKIE_NAME } = require('../constants')

exports.auth = function (req, res, next) {

    let token = req.headers["auth_token"]
    
    if (token) {

        verify(token, JWT_SECRET)
            .then(decodedToken => {
                req.user = decodedToken;
                next()
            })
            .catch(err => {

                res.status(400).json({ message: 'Invalid Token' })
            })

    } else {
        res.status(404).json({ message: 'Unauthorized request' })
    }
}
