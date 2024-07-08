const video = require('../models/videoModel');

const createVideoController = async(req, res) => {
    const {title, url } = req.body;
    try{
        const NewVideo = new video({title, url })
        if (!title || !url) {
            return res.status(400).json({ message: "Title and URL are required" });
        }
        await NewVideo.save();
        res.status(201).send({ 
            sucess: true,
            message: 'video created successfully' ,
            Video:NewVideo
    })
    }catch(error){
            res.status(500).send({ 
            sucess: false,
            message: 'Error in Video Create API',
            error: error.message
     })
    }
}

const getVideoByIdController = async( req, res)=>{
    try {
        const {id}= req.params;
        const Video = await video.findById(id);
        if (!video) {
          return res.status(404).send({ 
            sucess: false,
            message: 'Video not found' });
        }
        res.status(200).send({
            sucess: true,
            Video
        });
      } catch (error) {
            res.status(404).send({ 
            sucess: false,
            message: 'Error in get Video By Id API' });
        }
      }
    
const getAllVideoController = async(req, res)=> {
    try {
        const videos = await video.find();
        res.status(200).send({
            sucess: true,
            videos
        });
      } catch (error) {
            res.status(500).send({ 
            sucess: false,
            message: 'Error in get All Video API',
            error: error.message

        });
        }
      
      }
const updateVideoController = async (req, res)=> {
    try{
            const {title, url} = req.body;
    const {id} = req.params;
    let updatedVideo = await video.findById(id);
    
    if (!updatedVideo) {
        return res.status(404).json({ message: 'Video not found' });
      }

      updatedVideo.title = title || updatedVideo.title;
      updatedVideo.url = url || updatedVideo.url;

    updatedVideo = await updatedVideo.save();
    return res.status(200).send({
        success: true,
        message: 'video updated successfully',
        updatedVideo
    })
    }catch(error){
    res.status(500).send({ 
        sucess: false,
        message: 'Error in update Video API',
        error: error.message
    })
    }
}
const deleteVideoController = async (req, res) => {
    try {
      const {id} = req.params;
      const deletedVideo = await video.findByIdAndDelete(id);
      if (!deletedVideo) {
        return res.status(404).json({ message: 'Video not found' });
      }
      res.json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).send({ 
            sucess: false,
            message: 'Error in Delete Video API',
            error: error.message
        })
  };
}
module.exports = {getVideoByIdController, createVideoController, getAllVideoController, updateVideoController, deleteVideoController }