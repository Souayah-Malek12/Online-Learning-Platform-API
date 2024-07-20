const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();
  
const chatGptController = async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo',  
        prompt: prompt,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      success: true,
      message: 'ChatGPT API call successful',
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error in ChatGPT API call',
      error: error.response ? error.response.data : error.message,
    });
  }
};

module.exports = {chatGptController};
