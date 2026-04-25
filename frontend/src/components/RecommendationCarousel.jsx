import React from 'react';
import { Link } from 'react-router-dom';

const RecommendationCarousel = ({ recommendations, title, loading }) => {
  if (loading) {
    return (
      <div className="py-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#6366F1] font-bold">✨</span>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex-none w-64 h-80 bg-gray-200 animate-pulse rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="py-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#6366F1] font-bold">✨</span>
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          {title}
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#6366F1]/10 text-[#6366F1]">AI-Powered</span>
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {recommendations.map((rec, index) => (
          <div key={rec.product_id || index} className="flex-none w-64 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <Link to={`/products/${rec.product_id}`} className="block">
              <div className="h-40 bg-[#FFFBEB] rounded-t-xl flex items-center justify-center text-4xl">
                {rec.image || '🛒'}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate mb-1">{rec.name || `Product ${rec.product_id}`}</h3>
                <p className="text-sm text-gray-500 mb-2 truncate">{rec.reason}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#F59E0B]">${(rec.price || 9.99).toFixed(2)}</span>
                  <button className="text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">View</button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCarousel;
