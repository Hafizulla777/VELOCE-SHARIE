import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request Interceptor: Inject Bearer veloceToken ──
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('veloceToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: Handle 401 Globally ──
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('veloceToken');
      localStorage.removeItem('veloceUser');
      // Optional: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;