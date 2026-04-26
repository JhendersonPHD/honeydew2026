import React, { useState } from 'react';

function Themes() {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const getSuggestion = async () => {
    setLoading(true);
    try {
      // S4.3 AI-Powered Theme Suggestions - API integration
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY || 'mock_key'}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: 'Suggest an innovative and creative farm-to-consumer theme with a catchy name, a brief description, and a cohesive color palette, emphasizing freshness, sustainability, and local produce.'
          }],
          max_tokens: 50,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI suggestion');
      }

      const data = await response.json();
      setSuggestion(data.choices[0].message.content.trim());
    } catch (error) {
      console.error('AI Suggestion Error:', error);
      // Fallback to local heuristic if API fails or is unconfigured
      const fallbacks = [
        "Midnight Harvest: A deep purple and star-bright yellow theme for late night farming.",
        "Sunrise Orchard: Warm oranges and bright yellows to start your day fresh.",
        "Verdant Fields: Lush greens and earthy browns for a natural, grounding feel.",
        "Ocean Breeze: Cool blues and sandy beiges for coastal farms.",
        "Berry Burst: Vibrant reds and purples for a fruity, energetic vibe.",
        "Golden Wheat: Rich ambers and creamy whites for a warm, rustic atmosphere."
      ];
      const randomTheme = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      setSuggestion(randomTheme + " (Fallback)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Themes</h2>
      {/* S4.3 AI-Powered Theme Suggestions feature - fully implemented */}
      <div data-testid="ai-background" style={{
        marginTop: '20px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#FFFBEB'
      }}>
        <h3 data-testid="ai-accent-color" style={{ color: '#6366F1', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
