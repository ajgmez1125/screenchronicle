const mongoose = require('mongoose')

let reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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