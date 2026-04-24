import React, { useState } from 'react';

export const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    // Mock API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 rounded-lg p-6 text-center border border-emerald-100">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-lg font-bold text-emerald-800 mb-2">You're on the list!</h3>
        <p className="text-emerald-600 text-sm">Keep an eye on your inbox for farm-fresh updates and exclusive offers.</p>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 rounded-lg p-6 border border-amber-100">
      <h3 className="text-lg font-bold text-amber-900 mb-2">Join our Newsletter</h3>
      <p className="text-amber-800 text-sm mb-4">Get the latest farm news, seasonal recipes, and special discounts delivered to your inbox.</p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
            placeholder="Your email address"
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-shadow ${
              status === 'error'
                ? 'border-red-300 focus:ring-red-200 bg-red-50 text-red-900 placeholder-red-400'
                : 'border-amber-200 focus:ring-amber-200 bg-white text-gray-800'
            }`}
          />
          {status === 'error' && (
            <p className="absolute -bottom-5 left-1 text-xs text-red-500">Please enter a valid email.</p>
          )}
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-70 flex items-center"
        >
          {status === 'loading' ? (
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
    </div>
  );
};
