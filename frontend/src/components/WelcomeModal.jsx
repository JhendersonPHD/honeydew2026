import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen welcome modal
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      // Delay showing the modal slightly for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="h-40 bg-amber-400 relative">
          {/* Mock image placeholder */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-300 opacity-90"></div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        <div className="p-8 text-center -mt-16 relative z-10">
          <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-md mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">🍯</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to HoneyDew!</h2>
          <p className="text-gray-600 mb-6">
            Fresh from the farm, powered by AI. We connect you directly with local farmers for the freshest seasonal produce.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-amber-50 p-3 rounded-lg text-amber-800 text-sm font-medium">
              🚜 Direct from Farmers
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg text-emerald-800 text-sm font-medium">
              🌿 Always Fresh
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleClose}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-colors shadow-md shadow-amber-500/30"
            >
              Start Exploring
            </button>
            <Link
              to="/login"
              onClick={handleClose}
              className="block w-full py-2 text-amber-700 hover:text-amber-800 text-sm font-medium transition-colors"
            >
              Create an account & get 50 points
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
