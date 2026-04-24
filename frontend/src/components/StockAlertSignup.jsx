import React, { useState } from 'react';

export const StockAlertSignup = ({ productId, productName }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 800);
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg flex items-start">
        <svg className="w-5 h-5 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <p className="text-sm font-medium">We'll email you as soon as {productName || 'this item'} is back in stock!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h4 className="text-sm font-bold text-gray-800 mb-1">Out of Stock</h4>
      <p className="text-xs text-gray-600 mb-3">Get notified when this item is available.</p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-200 focus:border-amber-500 outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-900 transition-colors disabled:opacity-70 whitespace-nowrap"
        >
          {status === 'loading' ? 'Submitting...' : 'Notify Me'}
        </button>
      </form>
    </div>
  );
};
