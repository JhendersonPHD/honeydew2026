import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useErrorHandler } from '../hooks/useErrorHandler';
import PageTransition from '../components/PageTransition';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { handleError } = useErrorHandler();

  const handleMockLogin = () => {
    try {
      // Mock login logic
      login({ id: 1, name: 'Test User', email: 'test@example.com' });
      navigate('/dashboard');
    } catch (err) {
      handleError(err);
    }
  };

  const handleMockError = () => {
    handleError(new Error("Mock login failed due to network error"));
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-4 max-w-md mt-20">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <p className="mb-6 text-gray-600">Click below to mock a successful login and proceed to the dashboard.</p>
          <div className="space-y-4 flex flex-col">
            <button
              onClick={handleMockLogin}
              className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded w-full transition-colors"
            >
              Mock Login
            </button>
            <button
              onClick={handleMockError}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full transition-colors"
            >
              Simulate Error
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;