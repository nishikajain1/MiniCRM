import axios from 'axios';
import { store } from '../store/store'; // We'll need this later for tokens

const api = axios.create({
  baseURL: 'http://localhost:3001', // Your local machine's IP for Android emulator
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      // config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;