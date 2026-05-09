import axios, { AxiosError } from 'axios';

export const apiClient = axios.create({
  baseURL: '/api/proxy',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle auth errors globally
    if (error.response?.status === 401) {
      const errorData = error.response.data as { requiresAuth?: boolean };
      
      if (errorData?.requiresAuth) {
        // Redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login?session_expired=true';
        }
      }
    }
    
    return Promise.reject(error);
  }
);