const express = require("express")
const app = express();
const dotenv = require("dotenv")
const {connectDB} = require("./config/db")
const bodyParser = require('body-parser');



dotenv.config();
app.use(bodyParser.json());




app.use('/auth', require('./routes/authRoute'))




const PORT = process.env.PORT || 2024;
connectDB();

app.use(express.json());

app.get('/', (req, res)=> {
    return res.status(200).send( "<h1>Welcome Food Server App<h1>")
})

app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`);

});