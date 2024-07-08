const user = require("../models/userModel");


const createUserController = async(req, res)=> {
    try{
    const { nom, prenom, role, email, etablissement, motDePasse, adresse, phone} = req.body;
    const emailExist = await user.findOne({email});
    if(emailExist){
        return res.status(400).send({
            success : false,
            message: 'email already exist '
        })
    }
    
    const phoneExist = await user.findOne({phone});
    if(phoneExist){
        return res.status(400).send({
            success : false,
            message: 'phone already exist '
        })
    }
    const NewUser = new user({nom, prenom, role, email, etablissement, motDePasse, adresse, phone});
    await NewUser.save();
    res.status(201).send({
        success :true,
        message: "User created successfully ", 
        NewUser 
    })
} catch (error){
    res.status(500).send({
        success: false,
        message: 'Error in creating user Controller'  });

}
}

const getUsersController = async (req, res) => {
    try{
        const users = await user.find();
        const totalUsers = await user.countDocuments(); 

        if(!users){
            res.status(404).json({message: 'No users found'});
        }
        return res.status(200).send({
            success : true,
            TotalNumberOfUsers : totalUsers,
            users
        })

    }catch(error) {
        res.status(500).send({
            success : false,
            message: "Error in get users API",
            error: "error.message",

        })
    }
}

const getUserById = async(req, res) =>{
    try{
        const id = req.params.id;
        const userExist = await user.findById(id);
        if(!userExist){
            return res.status(404).send({
                success :false,
                message: "User not found ",
            })
        }
        res.status(201).send({
            success :true,
            userExist
        })
    }catch(error){
        res.status(500).send({
            success :false,
            message: "Error in Get User API"
        })
    }
}

const updateUserController = async(req, res)=> {
    try{
        const {id} = req.params;
        const { nom, prenom, role, email, etablissement, motDePasse, adresse, phone} = req.body;
        const userExist = await user.findById(id);
        if(!userExist){
            return res.status(404).send({
                success :false,
                message: "User not found ",
            })
        }
        userExist.nom = nom || userExist.nom;
        userExist.prenom = prenom || userExist.prenom;
        userExist.role = role || userExist.role;
        userExist.email = email || userExist.email;
        userExist.etablissement = etablissement || userExist.etablissement;
        userExist.motDePasse = motDePasse || userExist.motDePasse;
        userExist.adresse = adresse || userExist.adresse;
        userExist.phone = phone || userExist.phone;

        await userExist.save();

        return res.status(200).send({
            success: true,
            message: 'user updated successfully',
            userExist
        })

    }catch(error){
        res.status(500).send({
            success :false,
            message: "Error in update User API",
            message: error.message

        })
    }
}

const deleteUserController = async(req, res ) => {
    try{
        const {id} = req.params;
        const deletedUser = await user.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(404).send({
                success :false,
                message: "user not found  ",
            })
        }
        return res.status(200).send({
            success : true,
            messsage:'user deleted successfully',
            deletedUser
        })
    }catch(error){
        res.status(500).send({
            success :false,
            message: "Error in delete User API",
            message: error.message

        })
    }
}
const deleteAllUsersControllers = async(req, res)=> {
    try{
        const deletedUsers = await user.deleteMany();
        if(!deletedUsers){
            return res.status(404).send({
                success :false,
                message: "there is no users already ",
            })
        }
        return res.status(200).send({
            success : true,
            messsage:'users deleted successfully',
            result: deletedUsers.deletedCount(),
            deletedUsers
        })
    }catch(error){
        res.status(500).send({
            success :false,
            message: "Error in delete All User API",
            message: error.message

        })
    }
}
module.exports= {deleteAllUsersControllers ,createUserController, getUserById, getUsersController, updateUserController, deleteUserController}