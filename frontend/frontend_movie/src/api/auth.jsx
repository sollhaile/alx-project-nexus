import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for token injection
API.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for token refresh
API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const { data } = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken
        });
        
        localStorage.setItem('access_token', data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return API(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear storage and redirect
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  try {
    const { data } = await API.post('/api/token/', credentials);
    return {
      access: data.access,
      refresh: data.refresh
    };
  } catch (error) {
    const errorMessage = error.response?.data?.detail || 
                       error.response?.data?.message || 
                       'Login failed';
    throw new Error(errorMessage);
  }
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const getProtectedData = async () => {
  try {
    const { data } = await API.get('/api/protected/');
    return data;
  } catch (error) {
    throw error;
  }
};