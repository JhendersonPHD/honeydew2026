import React, { useState, useEffect } from 'react';

const fetchCartRecommendations = async (cartItems) => {
  // Try real endpoint
  try {
    const res = await fetch('/api/recommendations/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart_items: cartItems })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // console.warn
  }

  // Fallback mock
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { product_id: 201, name: "Fresh Basil", reason: "Pairs well with tomatoes", price: 2.99, image: "🌿" },
        { product_id: 202, name: "Garlic Bulbs", reason: "Essential kitchen staple", price: 1.50, image: "🧄" },
        { product_id: 203, name: "Olive Oil", reason: "Perfect for cooking your items", price: 14.99, image: "🫒" }
      ]);
    }, 600);
  });
};

const CheckoutRecommendations = ({ cartItems = [] }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartRecommendations(cartItems).then(data => {
      setRecommendations(data);
      setLoading(false);
    });
  }, [cartItems]);

  if (loading) {
    return (
      <div className="bg-[#FFFBEB] p-4 rounded-xl border border-[#F59E0B]/20 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#6366F1]">✨</span>
          <h3 className="font-bold text-gray-900">Complete Your Order</h3>
        </div>
        <div className="animate-pulse h-20 bg-white rounded-lg"></div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="bg-[#FFFBEB] p-4 rounded-xl border border-[#F59E0B]/20 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#6366F1]">✨</span>
        <h3 className="font-bold text-gray-900">Complete Your Order</h3>
        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-[#6366F1] text-white rounded">AI Pick</span>
      </div>

      <div className="space-y-3">
        {recommendations.slice(0, 3).map((rec, i) => (
          <div key={i} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="text-2xl bg-gray-50 h-10 w-10 rounded-full flex items-center justify-center">
                {rec.image || '🛒'}
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900">{rec.name}</p>
                <p className="text-xs text-[#6366F1]">{rec.reason}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#F59E0B]">${rec.price?.toFixed(2)}</span>
              <button className="text-xs font-semibold px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutRecommendations;
