import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/PageTransition';

const Home = () => {
  const { user } = useAuth();
  return (
    <PageTransition>
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold text-emerald-600 mb-6">Welcome to HoneyDew 2026</h1>
        <p className="text-lg mb-8">Farm fresh produce delivered directly to you.</p>
        <div className="space-x-4">
          {user ? (
            <Link to="/dashboard" className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/login" className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded">
              Login to continue
            </Link>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;