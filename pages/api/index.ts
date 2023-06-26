import axios from 'axios';
import { token } from '../../constants';

const BASE = process.env.NEXT_PUBLIC_BASE_URL
// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: BASE, // Replace with your API base URL
});

// Add an interceptor to set the Authorization header
api.interceptors.request.use((config) => {
  const accessToken = token(); // Replace with your token

  // If a token exists, set the Authorization header
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default api;