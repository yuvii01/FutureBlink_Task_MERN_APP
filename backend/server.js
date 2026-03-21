const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
// Allow all origins - useful for development/testing
// For production with specific domain, change back to whitelist approach
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: false // Set to false when using origin: '*'
}));
app.use(express.json());

console.log('=== Server Configuration ===');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set ✓' : 'NOT SET ✗');
console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? 'Set ✓' : 'NOT SET ✗');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'Not configured (auto-detect)');
console.log('PORT:', process.env.PORT || 5000);
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('==============================');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully ✓'))
  .catch(err => console.log('MongoDB connection error ✗:', err.message));

// Routes
const aiRoutes = require('./routes/ai');
const queryRoutes = require('./routes/queries');

app.use('/api', aiRoutes);
app.use('/api/queries', queryRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Test endpoint (no dependencies)
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
