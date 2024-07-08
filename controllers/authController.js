const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const userModel = require("../models/userModel");

const registreController = async (req, res) => {
    try {
        const { nom, prenom, role, email, etablissement, motDePasse, adresse, phone } = req.body;
        if(!nom || ! prenom || ! role || !email || !etablissement || !motDePasse || !adresse  || !phone ){
            return res.status(500).send({
                success: false,
                message : 'please Provide All field' 
            })
        }
        const allowedRoles = ["Student", "Administrator", "Professor"];
        if (!allowedRoles.includes(role)) {
          return res.status(400).send({
            success: false,
            message: 'Role must be Student, Administrator, or Professor',
          });
        }
        const userExist = await userModel.findOne({email});
        if(userExist){
            return res.status(500).send({
                success: false,
                message : 'user exist change another email' 
            });
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(motDePasse, salt);
        const user = await userModel.create({nom, prenom, role, email, etablissement, motDePasse : hashedPassword, adresse, phone})
        res.status(200).send({
            success: true,
            message : 'Successfelly registered please Log in',
            nom,
            prenom,
            role, 
            email, 
            etablissement, 
            adresse, 
            phone 
        })



    }catch(error){
        console.log(error);

    }

}

const loginController = async(req, res) => {
    try {
        const {email, motDePasse, role} = req.body ;

        if(!email || !motDePasse || !role){
            return res.status(400).send({
                success: false,
                message: 'Please provide Email and Password',
            });
        }
        const allowedRoles = ["Student", "Administrator", "Professor"];
        if (!allowedRoles.includes(role)) {
          return res.status(400).send({
            success: false,
            message: 'Role must be Student, Administrator, or Professor',
          });
        }

        const user = await userModel.findOne({email})
        
        if( !user){
            return res.status(404).send({
                success: false,
                message : 'User not found ' 
            });
        }

        const isMatch = await bcrypt.compare( motDePasse , user.motDePasse);
        if(!isMatch){
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials',
            })
        }

        const token = JWT.sign({id: user._id}, process.env.JWT_SECRET, { 
            expiresIn: '1d',
        });
        user.motDePasse = undefined;
        res.status(200).send({
            success: true,
            message: 'Login successfully',
            user,
            token,
        });


    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error: error.message

        })
    }
}




module.exports = {loginController , registreController}