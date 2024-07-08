const mongoose = require("mongoose")

const commentModel = new mongoose.Schema({
    videoId: {type: mongoose.Schema.Types.ObjectId, ref: 'Video'},
    timestamp: { type: Number, required: true },
    comment: { type: String, required: true },
})

module.exports = mongoose.model('Comment', commentModel )