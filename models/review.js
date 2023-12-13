const mongoose = require('mongoose')

let reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    media: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
        required: true
    },
    reviewString: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

let Review = module.exports = mongoose.model("Review", reviewSchema, "review")