const express = require("express")
const router = express.Router()
const {createQuizController, evaluateQuizController}= require("../controllers/quizController")

router.post('/createquiz', createQuizController)
router.post('/evaluatequiz', evaluateQuizController)




module.exports = router