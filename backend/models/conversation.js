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
})

module.exports = new mongoose.model('Conversation', conversationSchema)