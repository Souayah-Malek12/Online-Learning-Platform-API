const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");

// Initialize dotenv
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json()); // Use express.json() to parse JSON requests

// Database connection
const { connectDB } = require("./config/db");
connectDB(); // Ensure the database connection is established before starting the server

// Define routes
app.use('/auth', require('./routes/authRoute'));
app.use('/courses', require('./routes/courseRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/video', require('./routes/videoRoutes'));
app.use('/quizzes', require('./routes/quizRoutes'));
app.use('/chatbot', require('./routes/chatGptRoute'));
app.use('/discussions', require('./routes/discussionRoute'));


// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Frontend URL
        methods: ["GET", "POST"],
    }
});

// Socket.IO events
io.on('connection', (socket) => {
    console.log(`New User connected ${socket.id}`);

    socket.on('sendMessage', (message) => {
        // Emit message to all clients, including the sender
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Define a simple route
app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome Online Learning Platform</h1>");
});

// Start the server
const PORT = process.env.PORT || 2024;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
