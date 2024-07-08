const express = require("express")

const router = express.Router();
const {createCourseController, deleteAllCourseController,getCoursesController, getCourseByIdController, updateCourseController, deleteCourseController} = require("../controllers/courseController")


router.post('/create', createCourseController);
router.get('/getcourse', getCoursesController)
router.get('/getcourseById/:id', getCourseByIdController)
router.put('/updatecourse/:id', updateCourseController)
router.delete('/deletecourse/:id', deleteCourseController)
router.delete('/deleteAllcourse/:id', deleteAllCourseController)











module.exports = router;