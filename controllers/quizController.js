const quizModel = require("../models/quizModel")
const Course = require("../models/courseModel")

const createQuizController = async(req, res)=> {
    try {

    
        const {course, questions} = req.body;
        if (!course || !questions || questions.length === 0) {
            return res.status(400).json({
                success: false,
                message: "enter all fields",
            });
        }
        const courseExist = await Course.findById(course)
        if(!courseExist){
            return res.status(404).json({
                success: false,
                message: "course not found",
            });
        }
        const quiz = new quizModel({course, questions})
        await quiz.save();
        res.status(201).send({
            success: true,

            message: 'Quiz created successfully', 
            quiz
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
      success: false,
      message: "Error In Course Create API",
      error,
        })
    }
    }

    const evaluateQuizController = async(req, res)=> {
        try{
        const {quizId, userAnswers}= req.body;
        const quiz = await quizModel.findById(quizId)
        if(!quiz){
            return res.status(404).json({
                success: false,
                message: "Quiz not found",
            });
        }
        let score = 0;
        quiz.questions.forEach((question, index)=>{
        if(question.correctOption=== userAnswers[index]){
            score+=1;
        }
        });
        const Percentage = (score/quiz.questions.length)*100;
        res.status(201).send({
            success : true,
            message: 'quiz successfully evaluated',
            score,
            Percentage
        })
    }catch(error){
        res.status(500).send({
            success: false,
            message: "Erreur lors de l'évaluation du quiz",
            error,
        });
    }


    }



module.exports = {createQuizController, evaluateQuizController}
