import React, { useState, useEffect } from 'react';
import RecommendationCarousel from './RecommendationCarousel';

// Mock API call to fetch personalized recommendations
const fetchPersonalized = async () => {
  // Try to use real API endpoint
  try {
    const res = await fetch('/api/recommendations/personalized?limit=6');
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (e) {
    console.warn("Using fallback recommendations");
  }

  // Fallback for prototype
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { product_id: 101, name: "Organic Honeycrisp Apples", reason: "Based on your interest in organic fruits", price: 6.99, image: "🍎" },
        { product_id: 102, name: "Free-Range Eggs", reason: "Frequently bought with your items", price: 5.49, image: "🥚" },
        { product_id: 103, name: "Sourdough Bread", reason: "Matches your dietary preferences", price: 7.00, image: "🍞" },
        { product_id: 104, name: "Raw Honey", reason: "Trending right now", price: 12.50, image: "🍯" }
      ]);
    }, 800);
  });
};

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersonalized().then(data => {
      setRecommendations(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full">
      <RecommendationCarousel
        recommendations={recommendations}
        title="Recommended For You"
        loading={loading}
      />
    </div>
  );
};

export default Recommendations;
