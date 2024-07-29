const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const chatGptController = async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',  // Correct endpoint for chat models
      {
        model: 'gpt-3.5-turbo',  
        messages: [{ role: 'user', content: prompt }],  // Structure message as per chat model requirements
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const message = response.data.choices[0].message.content;  // Extract the relevant content from the response

    res.json({
      success: true,
      message: 'ChatGPT API call successful',
      data: message,
    });
  } catch (error) {
    console.error('Error in ChatGPT API call:', error);  // Log error details
    res.status(500).json({
      success: false,
      message: 'Error in ChatGPT API call',
      error: error.response ? error.response.data : error.message,
    });
  }
};

module.exports = { chatGptController };
