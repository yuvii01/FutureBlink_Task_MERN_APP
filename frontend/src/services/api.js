import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const callAI = async (prompt) => {
  try {
    const response = await axios.post(`${API_URL}/api/ask-ai`, {
      prompt
    });
    return response.data.response;
  } catch (error) {
    console.error('Error calling AI:', error);
    throw error;
  }
};

export const saveQuery = async (prompt, response) => {
  try {
    const res = await axios.post(`${API_URL}/api/queries/save`, {
      prompt,
      response
    });
    return res.data;
  } catch (error) {
    console.error('Error saving query:', error);
    throw error;
  }
};

export const getAllQueries = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/queries/all`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching queries:', error);
    throw error;
  }
};

export const deleteQuery = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/queries/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting query:', error);
    throw error;
  }
};
