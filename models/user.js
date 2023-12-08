const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    watched: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Media",
        required: false
    },
    watching: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Media",
        required: false
    },
    plantowatch: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Media",
        required: false
    },
})

let User = module.exports = mongoose.model("User", userSchema, "user")