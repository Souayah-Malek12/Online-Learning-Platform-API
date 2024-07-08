const mongoose = require("mongoose")

const CourseSchema = new mongoose.Schema({
    title: {
        type: String , required :true
    },
    description: { type: String, required: true },
    videos: [{ type: String}],
    quizzes : [{ type: mongoose.Schema.Types.ObjectId , ref :'Quiz'}],
    created_at : {type : Date , default : Date.now}
})

module.exports = mongoose.model('Course', CourseSchema)