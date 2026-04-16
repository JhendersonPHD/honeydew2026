import { useCallback } from 'react';
import { toast } from 'react-toastify';

export const useErrorHandler = () => {
  const handleError = useCallback((error) => {
    console.error('API Error:', error);

    let message = 'An unexpected error occurred. Please try again.';

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.data && error.response.data.message) {
        message = error.response.data.message;
      } else if (error.response.status === 404) {
        message = 'Resource not found.';
      } else if (error.response.status === 401) {
        message = 'You need to be logged in to do that.';
      } else if (error.response.status >= 500) {
        message = 'Server error. Please try again later.';
      }
    } else if (error.request) {
      // The request was made but no response was received
      message = 'Network error. Please check your connection.';
    } else if (error.message) {
      // Something happened in setting up the request that triggered an Error
      message = error.message;
    }

    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);

  return { handleError };
};