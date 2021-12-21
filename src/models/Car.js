const mongoose = require('mongoose');


const carSchema = new mongoose.Schema({

    brand: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2021
    },

    category: {
        type: String,
        required: true,
        enum: ['Cabriolet', 'Small Car', 'SUV/Off-road', 'Estate Car', 'Saloon', 'Sports Car/Coupe', 'Van']
    },

    mileage: {
        type: Number,
        required: true,
        min: 0,
    },

    horsePower: {
        type: Number,
        required: true,
        min: 0,
    },

    fuel: {
        type: String,
        required: true,
        enum: ['Petrol', 'Diesel', 'Electric', 'LPG', 'Hybrid', 'Hydrogen']
    },

    gearbox: {
        type: String,
        required: true,
        enum: ['Manual', 'Semi-automatic', 'Automatic']
    },

    color: {
        type: String,
        required: true,
    },

    extras: {
        type: String,
        required: true,
        minlength: 10
    },

    description: {
        type: String,
        required: true,
        minlength: 15
    },

    location: {
        type: String,
        required: true,
    },

    contactNumber: {
        type: Number,
        required: true
    },

    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\//i, 'Invalid image url']
    },

    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

    votesOnAd: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],

    likes: {
        type: Number,
        default: 0,
    },

    dislikes: {
        type: Number,
        default: 0,
    },


}, {
    timestamps: true
})


const Car = mongoose.model('Car', carSchema);

module.exports = Car;