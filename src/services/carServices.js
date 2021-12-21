const Car = require('../models/Car')


exports.getLastAdded = () => Car.find().sort({ createdAt: -1 }).limit(3).lean();

exports.getAll = () => Car.find().sort({ createdAt: -1 }).lean()

exports.create = (data) => Car.create(data)

exports.getOne = (cardId) => Car.findById(cardId).populate('votesOnAd');

exports.getUpdatedCar = (cardId) => Car.findById(cardId).lean()

exports.deleteOne = (carId) => Car.findByIdAndDelete(carId)

exports.editOne = (carId, carData) => Car.findByIdAndUpdate(carId, carData, { runValidators: true })

exports.likes = (carId, votersId) => {

    return Car.findOneAndUpdate({ _id: carId }, { $push: { votesOnAd: votersId }, $inc: { likes: +1 } })
}
exports.dislikes = (carId, votersId) => {

    return Car.findOneAndUpdate({ _id: carId }, { $push: { votesOnAd: votersId }, $inc: { dislikes: +1 } })
}

exports.myCars = (id) =>{
    return Car.find({creator: id}).lean();
}