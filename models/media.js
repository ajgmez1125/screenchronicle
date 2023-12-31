const mongoose = require('mongoose')

let mediaSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    directors: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    total_seasons: {
        type: Number,
        required: false
    },
    total_episodes: {
        type: Number,
        required: false
    }
})

let Media = module.exports = mongoose.model("Media", mediaSchema, "media")