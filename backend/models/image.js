const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    uid: String,
    image: String,
    postedAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    }
})

module.exports = new mongoose.model('Image', imageSchema)