const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    members: [String],
    chats: [{
        sender: String,
        body: String,
        sendDate: {
            type: Date,
            immutable: true,
        }
    }],
    lastUpdate: {
        type: Date,
        default: () => Date.now()
    }
})

module.exports = new mongoose.model('Conversation', conversationSchema)