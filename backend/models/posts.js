const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String

    }
})

const post = new mongoose.Schema({
    uid: Number,
    name: String,
    img: imageSchema,
    content: String
})

module.exports = new mongoose.model('Image', imageSchema)