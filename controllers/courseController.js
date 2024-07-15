const courseModel = require("../models/courseModel");
const Course = require("../models/courseModel")

const createCourseController = async(req, res) => {
    try {
        const { title, description, videos, quizzes } = req.body;
        if (!title || !description || !videos || !quizzes || videos.length === 0 || quizzes.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields (title, description, videos[], quizzes[]).",
            });
        }
        

        const course = new Course( { title, description, videos, quizzes });
        await course.save();
        res.status(201).json({ message: 'Course Created Successfully', course });

    }catch(error ){
        console.log(error);
        res.status(500).send({
      success: false,
      message: "Error In Course Create API",
      error,
    });
  }
}

const getCoursesController = async(req, res)=>{
    try{
        const courses = await Course.find().populate('quizzes');
        return res.status(200).send({
            success: true,
            courses
            
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get Course API",
            error
        })
    }
 }

const getCourseByIdController = async (req, res)=> {
    try {
        const {id} = req.params.id;
        const course = await Course.findById(id);
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get Course by Id API",
            error
        })
    }
}

const updateCourseController = async (req, res) => {
    try {

      const { title, description, videos, quizzes } = req.body;
      const {id} = req.params.id.trim();
   
      const course = await Course.findById(id);
      
      if (!course) {
        return res.status(404).json({ message: 'Cours non trouvé' });
      }
      const updatedCouse = Course.findByIdAndUpdate({
        title,
        description,
        videos,
        quizzes
      }, {new: true});
      res.status(200).send({ 
        message: 'course updated Successfully',
         course });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get Update Course  API",
            error
        })
    }
  };
 const deleteCourseController = async (req, res)=> {
    try{
    const {id} = req.params;
    const course = await Course.findById(id);
    if (!course) {
        return res.status(404).json({ message: 'Cours non trouvé' });
    }
    await courseModel.findByIdAndDelete(id);
    res.status(200).send({
        success: true,
        message: "course  Deleted ",
      });
    }catch(error){
        return res.status(500).send({
            success: false,
            message: "Error in delete course API"
        })
    }

 }

 const deleteAllCourseController = async(req, res) => {
    try{
    await Course.deleteMany();
    return res.status(200).send({
        success: true,
        messsage: 'Courses deleted successfully'
    })
    }catch(error){
        return res.status(200).send({
            success: false,
            messsage: 'Error in delete all courses API'
        })
    }
 }
module.exports = {createCourseController, getCoursesController, deleteAllCourseController,getCourseByIdController, updateCourseController , deleteCourseController}













