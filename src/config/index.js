import axios from 'axios';
import router from '@/router'; // Import your Vue router instance
const apiUrl = import.meta.env.VITE_API_URL;

// Create an Axios instance
const apiClient = axios.create({
  baseURL: apiUrl, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setAuthToken(token) {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
}
// Add an interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    const pathName = window.location.pathname;
    if (
      error.response &&
      error.response.status === 401 &&
      pathName !== '/signin' &&
      pathName !== 'signup'
    ) {
      // Handle token expiration or unauthorized access
      localStorage.removeItem('token'); // Remove token from local storage
      localStorage.removeItem('userId'); // Remove user ID if stored
      localStorage.removeItem('userName'); // Remove user name if stored

      alert('Your session has expired. Please log in again.');
      router.push('/signin'); // Redirect to sign-in page
    }

    return Promise.reject(error); // Reject other errors
  }
);

export default apiClient;
