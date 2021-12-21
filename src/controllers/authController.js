const router = require('express').Router();
const authService = require('../services/authService')
const carService = require('../services/carServices.js')
const { AUTH_COOKIE_NAME } = require('../constants')
const { auth } = require('../middlewares/authMiddleware')

router.post('/register', async (req, res) => {

    // console.log(req.body)

    const { fullName, email, password, repeatPassword } = req.body

    try {

        const existingUser = await authService.checkExistEmail(email);

        if (existingUser) {
            return res.status(403).json({ message: "User already exist." })
        }

        if (password !== repeatPassword) {
            return res.json({ message: "Password don't mach" })
        }

        const register = await authService.register({ fullName, email, password })
        res.status(200).json(register)
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" })
    }

})

router.post('/login', async (req, res) => {

    const { email, password } = req.body

    try {

        let user = await authService.login({ email, password })
        // console.log(user)

        let accessToken = await authService.createToken(user)


        let data = {
            userId: user.id,
            email: user.email,
            fullName: user.fullName,
            accessToken
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(403).json({ message: error.message })
    }

})

router.get('/logout', auth, (req, res) => {

    try {
        let data = {
            userId: '',
            email: '',
            fullName: '',
            accessToken: '',
        }

        res.status(200).json(data)

    } catch (error) {
        res.status(404).json('Logout fail')
    }
})

router.get('/:userId/myCars', async (req, res) => {

    console.log(req.params.userId)

    try {
        let data = await carService.myCars(req.params.userId)
        console.log(data)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" })
    }
})

module.exports = router;