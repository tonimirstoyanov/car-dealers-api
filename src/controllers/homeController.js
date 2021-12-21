const router = require('express').Router();

const carService = require('../services/carServices')


router.get('/', async (req, res) => {

    try {
        let lastAddedCar = await carService.getLastAdded();

        res.status(200).json(lastAddedCar)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

module.exports = router;