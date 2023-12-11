import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('workout-buddy-api-kappa.vercel.app/api/user/signup', { email, password });

      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(response.data));

      // Update the auth context
      dispatch({ type: 'LOGIN', payload: response.data });

      // Update loading state
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };

  return { signup, isLoading, error };
};
