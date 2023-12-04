const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
    },
    duration:{
        type:Number,
        require: [true, 'A tour must have a duration']
    },
    maxGroupSize:{
        type:Number,
        require: [true, 'A tour must have a group Size']
    },
    difficulty:{
        type:String,
        require: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'min 1'],
        max: [5, 'max 5'],
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price'],
    },
    pricedDiscount: {
        type: Number,
    },
    summary:{
        type:String,
        trim:true,
        required: [true, 'A tour must have summary']
    },
    description:{
        type:String,
        trim: true,
    },
    imageCover:{
        type:String,
        required: [true,'A tour must have cover image']
    },
    images:{
        type:[String]
    },
    createdAt:{
        type:   Date,
        default: Date.now()
    },
    startDates:[Date]
})

const Tour = mongoose.model('Tour',tourSchema);

module.exports = Tour;