import React, { useState } from 'react';

function Themes() {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const getSuggestion = () => {
    setLoading(true);
    // Simulate AI generating a theme suggestion
    setTimeout(() => {
      const themes = [
        "Midnight Harvest: A deep purple and star-bright yellow theme for late night farming.",
        "Sunrise Orchard: Warm oranges and bright yellows to start your day fresh.",
        "Verdant Fields: Lush greens and earthy browns for a natural, grounding feel.",
        "Ocean Breeze: Cool blues and sandy beiges for coastal farms.",
        "Berry Burst: Vibrant reds and purples for a fruity, energetic vibe."
      ];
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      setSuggestion(randomTheme);
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Themes</h2>
      <div style={{
        marginTop: '20px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#FFFBEB'
      }}>
        <h3 style={{ color: '#6366F1', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ✨ AI-Powered Theme Suggestions
        </h3>
        <p>Looking for inspiration? Let our AI suggest a new theme for your calculator!</p>

        <button
          onClick={getSuggestion}
          disabled={loading}
          style={{
            backgroundColor: '#6366F1',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: loading ? 'wait' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '10px'
          }}
        >
          {loading ? 'Generating Idea...' : 'Suggest a Theme'}
        </button>

        {suggestion && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '4px',
            borderLeft: '4px solid #6366F1'
          }}>
            <p style={{ margin: 0, fontStyle: 'italic' }}>"{suggestion}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Themes;
