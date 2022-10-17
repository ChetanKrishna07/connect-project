const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    }
})

const postSchema = new mongoose.Schema({
    uid: String,
    title: String,
    image: imageSchema,
    content: String
})

module.exports = new mongoose.model('Post', postSchema)