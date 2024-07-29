const express = require("express")

const router = express.Router();
const {createCourseController, deleteAllCourseController,getCoursesController, getCourseByIdController, updateCourseController, deleteCourseController} = require("../controllers/courseController");
const authMiddleware = require("../middellwares/authMiddleware");


router.post('/create', authMiddleware,createCourseController);
router.get('/getcourse', authMiddleware ,getCoursesController)
router.get('/getcourseById/:id', authMiddleware,getCourseByIdController)
router.put('/updatecourse/:id', authMiddleware,updateCourseController)
router.delete('/deletecourse/:id',authMiddleware, deleteCourseController)
router.delete('/deleteAllcourse/:id', authMiddleware, deleteAllCourseController)











module.exports = router;