const router = require('express').Router()

const authController = require('./controllers/authController')
const homeController = require('./controllers/homeController')
const carController = require('./controllers/carController')

router.use(homeController)
router.use('/car', carController)
router.use('/user', authController)

module.exports = router