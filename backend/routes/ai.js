const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/ask-ai', async (req, res) => {
  try {
    console.log('Received prompt request...');
    const { prompt } = req.body;

    if (!prompt) {
      console.log('No prompt provided');
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Prompt:', prompt);
    console.log('API Key exists:', !!process.env.OPENROUTER_API_KEY);
    console.log('Making request to OpenRouter...');

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'arcee-ai/trinity-large-preview:free',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('OpenRouter response received');
    const aiResponse = response.data.choices[0].message.content;

    res.json({ response: aiResponse });
  } catch (error) {
    console.error('=== ERROR DETAILS ===');
    console.error('Error Message:', error.message);
    console.error('Error Status:', error.response?.status);
    console.error('Error Data:', error.response?.data);
    console.error('==================');
    
    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.response?.data || error.message 
    });
  }
});

module.exports = router;
