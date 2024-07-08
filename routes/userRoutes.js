const express = require("express")
const router = express.Router()
const { createUserController, getUserById, getUsersController, updateUserController, deleteUserController, deleteAllUsersControllers } = require("../controllers/userController")


router.post('/createuser', createUserController)
router.get('/getuser/:id', getUserById);
router.get('/getusers', getUsersController)
router.put('/updateuser/:id', updateUserController)
router.delete('/deleteuser/:id', deleteUserController)
router.delete('/deleteAllusers', deleteAllUsersControllers)
module.exports= router;