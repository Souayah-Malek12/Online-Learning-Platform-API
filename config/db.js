const mongoose = require("mongoose")

const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to database ${mongoose.connection.host}`)
    }catch(error ){
        console.log("DataBase error");
    }
}

module.exports = {connectDB}