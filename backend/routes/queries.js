const express = require('express');
const router = express.Router();
const Query = require('../models/Query');

// Save a query and response
router.post('/save', async (req, res) => {
  try {
    const { prompt, response } = req.body;

    if (!prompt || !response) {
      return res.status(400).json({ error: 'Prompt and response are required' });
    }

    const newQuery = new Query({
      prompt,
      response
    });

    await newQuery.save();
    res.status(201).json({ 
      message: 'Query saved successfully',
      data: newQuery 
    });
  } catch (error) {
    console.error('Error saving query:', error);
    res.status(500).json({ error: 'Failed to save query' });
  }
});

// Get all queries
router.get('/all', async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.json({ data: queries });
  } catch (error) {
    console.error('Error fetching queries:', error);
    res.status(500).json({ error: 'Failed to fetch queries' });
  }
});

// Delete a query
router.delete('/:id', async (req, res) => {
  try {
    const query = await Query.findByIdAndDelete(req.params.id);
    if (!query) {
      return res.status(404).json({ error: 'Query not found' });
    }
    res.json({ message: 'Query deleted successfully' });
  } catch (error) {
    console.error('Error deleting query:', error);
    res.status(500).json({ error: 'Failed to delete query' });
  }
});

module.exports = router;
