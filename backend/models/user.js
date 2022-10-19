const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    uid: String,
    password: String,
    about: String,
    mobile: Number,
    birthday: String,
    gender: String,
    blood_group: String,
    country: String,
    occupation: String,
    hobbies: String,
    education: String,
    workExp: String,
    other: String,
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    }
})

module.exports = new mongoose.model('User', userSchema)