const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY 

const chatGptController = async (req, res) => {
    const { message } = req.body;
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                prompt: message,
                max_tokens: 150,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        res.json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error in chatGptController:', error);
        res.status(500).send({
            success: false,
            message: 'Error in chatGpt API',
            error: error.message,
        });
    }
};

module.exports = { chatGptController };
