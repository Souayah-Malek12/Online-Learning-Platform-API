const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    role : { type: String
            , enum : ['Student', 'Professor', 'Administrator'],
             required: [true, 'user type is required'],
             default : 'Student'},
    email: { type: String, required: true, unique: true },
    etablissement: { type: String },
    motDePasse: { type: String, required: true },
    adresse: { type: String },
    phone: { type: Number }   
})

module.exports = mongoose.model("User" ,UserSchema)