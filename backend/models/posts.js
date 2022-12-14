const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    uid: String,
    title: String,
    image: String,
    content: String,
    postedAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    }
})

module.exports = new mongoose.model('Post', postSchema)