import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log('🔗 API URL configured as:', API_URL);

// Create axios instance with better error handling
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const callAI = async (prompt) => {
  try {
    console.log('📤 Sending request to:', `${API_URL}/api/ask-ai`);
    const response = await apiClient.post('/api/ask-ai', {
      prompt
    });
    console.log('✅ Response received');
    return response.data.response;
  } catch (error) {
    console.error('❌ Error calling AI:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    
    if (error.message === 'Network Error') {
      throw new Error(`Cannot reach API server at ${API_URL}. Make sure backend is running.`);
    }
    throw error;
  }
};

export const saveQuery = async (prompt, response) => {
  try {
    console.log('💾 Saving query to:', `${API_URL}/api/queries/save`);
    const res = await apiClient.post('/api/queries/save', {
      prompt,
      response
    });
    console.log('✅ Query saved');
    return res.data;
  } catch (error) {
    console.error('❌ Error saving query:', error);
    throw error;
  }
};

export const getAllQueries = async () => {
  try {
    console.log('📖 Fetching queries from:', `${API_URL}/api/queries/all`);
    const response = await apiClient.get('/api/queries/all');
    return response.data.data;
  } catch (error) {
    console.error('❌ Error fetching queries:', error);
    throw error;
  }
};

export const deleteQuery = async (id) => {
  try {
    const response = await apiClient.delete(`/api/queries/${id}`);
    return response.data;
  } catch (error) {
    console.error('❌ Error deleting query:', error);
    throw error;
  }
};
