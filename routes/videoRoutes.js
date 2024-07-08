const express = require("express");
const router = express.Router();
const {getVideoByIdController, createVideoController, getAllVideoController, updateVideoController, deleteVideoController} = require('../controllers/videoController')



router.post('/createvideo', createVideoController);
router.get('/getvideo/:id', getVideoByIdController);
router.get('/getvideos', getAllVideoController );
router.put('/updatevideo/:id', updateVideoController)
router.delete('/deletevideo/:id', deleteVideoController)


module.exports = router;