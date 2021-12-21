const router = require('express').Router();

const carService = require('../services/carServices')
const { auth } = require('../middlewares/authMiddleware')

router.get('/catalog', async (req, res) => {

    try {
        const getCar = await carService.getAll();

        res.status(200).json(getCar)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.post('/create', auth, async (req, res) => {

    const body = req.body
    // console.log(req.user)

    try {

        let newCar = await carService.create({ ...body, creator: req.user._id })

        res.status(201).json(newCar)

    } catch (error) {
        res.status(409).json({ message: error.message })
    }
})

router.get('/:carId/details', async (req, res) => {

    try {
        let car = await carService.getUpdatedCar(req.params.carId);
        // console.log(car)
        // let carData = await car.toObject();

        // let isOwner = carData.creator == req.user?._id;
        // let isLogged = req.user == undefined ? false : true;
        // let votedPeople = car.getVotedPeople()

        // console.log(voters)
        // let isVoted = car.votesOnAd.some(x => x._id == req.user?._id)

        // res.json({ carData, isOwner, isLogged, isVoted, votedPeople })
        // console.log(car)
        res.json(car)
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.delete('/:carId/delete', async (req, res) => {

    try {

        let result = await carService.deleteOne(req.params.carId)

        res.status(200).json(result)

    } catch (err) {

        console.log(err)
    }

})

router.put('/:carId/edit', async (req, res) => {

    try {

        let car = await carService.editOne(req.params.carId, req.body)
        let carData = await carService.getOne(req.params.carId)

        res.status(200).json(carData)
    } catch (err) {
        res.status(400).json(err)

    }
})

router.post('/:carId/likes', async (req, res) => {

    try {


        let carInfo = await carService.likes(req.params.carId, req.body.userId)
        // let isVoted = car.votesOnAd.some(x => x._id == req.body.userId)

        let car = await carService.getUpdatedCar(req.params.carId);

        // console.log(isVoted)
        // console.log(carData)
        console.log(car)
        res.status(200).json(car)
    } catch (err) {
        console.log(err)
    }
})

router.post('/:carId/dislikes', async (req, res) => {
    try {


        let carInfo = await carService.dislikes(req.params.carId, req.body.userId)
        // let isVoted = car.votesOnAd.some(x => x._id == req.body.userId)

        let car = await carService.getUpdatedCar(req.params.carId);

        // console.log(isVoted)
        // console.log(carData)
        console.log(car)
        res.status(200).json(car)
    } catch (err) {
        console.log(err)
    }
})



module.exports = router;