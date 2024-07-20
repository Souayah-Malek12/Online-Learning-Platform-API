import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const socket = io.connect("http://localhost:2024");

function App() {
    const [sentMessage, setSentMessage] = useState("");
    const [receivedMessages, setReceivedMessages] = useState([]);
    const discussionId = 'default-discussion'; // Use your discussion ID here

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:2024/discussions/${discussionId}`);
            setReceivedMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();

        const handleMessage = (message) => {
            setReceivedMessages(prevMessages => [...prevMessages, message]);
        };

        socket.on('receiveMessage', handleMessage);

        return () => {
            socket.off('receiveMessage', handleMessage);
        };
    }, []);

    const sendMessage = async () => {
        if (sentMessage.trim()) {
            const message = { user: 'User', message: sentMessage };
            try {
                await axios.post(`http://localhost:2024/discussions/${discussionId}`, message);
                socket.emit('sendMessage', message);
                setSentMessage("");
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div className="App">
            <div className="message-container">
                {receivedMessages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.user || 'User'}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', marginTop: '10px' }}>
                <input
                    placeholder="Message..."
                    value={sentMessage}
                    onChange={(e) => setSentMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send Message</button>
            </div>
        </div>
    );
}

export default App;
