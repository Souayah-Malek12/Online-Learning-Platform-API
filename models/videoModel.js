const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    title: {type : String, required: true},
    url: { type: String, required: true },
    comments: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
    ]
});

module.exports = mongoose.model('Video', videoSchema)