const express = require("express")
const app = express();
const dotenv = require("dotenv")
const {connectDB} = require("./config/db")
const bodyParser = require('body-parser');

require('./models/courseModel');
require('./models/quizModel');
require('./models/videoModel');

dotenv.config();
app.use(bodyParser.json());




app.use('/auth', require('./routes/authRoute'))
app.use('/courses', require('./routes/courseRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/video', require('./routes/videoRoutes'))
app.use('/quizzes', require("./routes/quizRoutes"))


const PORT = process.env.PORT || 2024;
connectDB();

app.use(express.json());

app.get('/', (req, res)=> {
    return res.status(200).send( "<h1>Welcome Food Server App<h1>")
})

app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`);

});