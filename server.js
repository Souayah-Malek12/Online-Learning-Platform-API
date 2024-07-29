const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'  
}));
app.use(express.json()); 

const { connectDB } = require("./config/db");
connectDB(); 


app.use('/auth', require('./routes/authRoute'));
app.use('/courses', require('./routes/courseRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/quizzes', require('./routes/quizRoutes'));
app.use('/chatbot', require('./routes/chatGptRoute'));
app.use('/discussions', require('./routes/discussionRoute'));


const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"],
    }
});


io.on('connection', (socket) => {
    console.log(`New User connected ${socket.id}`);

    socket.on('sendMessage', (message) => {
        
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome Online Learning Platform</h1>");
});


const PORT = process.env.PORT || 2024;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
