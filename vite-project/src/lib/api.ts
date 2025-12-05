import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    if (response) {
      // Handle 401 Unauthorized (Not logged in)
      if (response.status === 401) {
        const errorMessage = response.data?.message || "You must be logged in to access this resource";
        if (!toast.isActive('auth-error')) {
          toast.error(errorMessage, { toastId: 'auth-error', position: 'bottom-right' });
        }
      }

      // Handle 403 Forbidden (Logged in but no permission)
      if (response.status === 403) {
        const errorMessage = response.data?.error || response.data?.message || "You do not have permission to perform this action";
        if (!toast.isActive('perm-error')) {
          toast.error(errorMessage, { toastId: 'perm-error', position: 'bottom-right' });
        }
      }

      // Handle 400 Bad Request (specifically for validId or simple errors)
      // We check for 'error' property to distinguish from Joi validation which uses 'fields'/'details'
      if (response.status === 400 && response.data?.error) {
        if (!toast.isActive('bad-request')) {
          toast.error(response.data.error, { toastId: 'bad-request', position: 'bottom-right' });
        }
      }
    }

    throw error;
  }
);

export default api;