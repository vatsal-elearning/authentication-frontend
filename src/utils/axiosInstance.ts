import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Refresh token logic
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!localStorage.getItem('token')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop

      try {
        // Call refresh token API
        const { data } = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true, // Ensure cookies are sent
        });

        // Update Axios headers with new access token
        API.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        originalRequest.headers['Authorization'] = `Bearer ${data.token}`;

        // Retry the original request
        return API(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default API;
