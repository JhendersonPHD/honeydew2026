import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const AbandonedCartBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mock check for abandoned cart
    const cartData = localStorage.getItem('cart');
    const lastActive = localStorage.getItem('lastActive');

    // If cart has items and user hasn't been active for a while, show banner
    if (cartData && JSON.parse(cartData).length > 0) {
      // Simulate delay before showing banner for returning user
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-amber-100 border-b border-amber-200 py-3 px-4 shadow-sm relative z-40">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center text-amber-900 mb-2 sm:mb-0">
          <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span className="text-sm font-medium">You left something behind! Complete your order before items sell out.</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold rounded shadow transition-colors whitespace-nowrap"
          >
            View Cart
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="text-amber-700 hover:text-amber-900 transition-colors p-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
