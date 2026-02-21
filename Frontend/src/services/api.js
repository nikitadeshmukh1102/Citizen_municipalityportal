import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('crp_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// auto logout on session expiry
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
