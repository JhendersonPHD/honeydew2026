import React, { useState } from 'react';

function Themes() {
  const [suggestion, setSuggestion] = useState(null);
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
            content: 'Suggest an innovative and creative farm-to-consumer theme emphasizing freshness, sustainability, and local produce. Return the response strictly as a JSON object with the following keys: "name" (a catchy theme name), "description" (a brief description), and "colors" (an object containing "primary", "secondary", "background", and "text" keys mapped to specific hex codes).'
          }],
          max_tokens: 300,
          temperature: 0.8,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI suggestion');
      }

      const data = await response.json();
      const content = JSON.parse(data.choices[0].message.content.trim());
      setSuggestion(content);
    } catch (error) {
      console.error('AI Suggestion Error:', error);
      // Fallback to local heuristic if API fails or is unconfigured
      const fallbacks = [
        { name: "Midnight Harvest", description: "A deep purple and star-bright yellow theme for late night farming.", colors: { primary: "#4B0082", secondary: "#FFD700", background: "#1A1A2E", text: "#EAEAEA" } },
        { name: "Sunrise Orchard", description: "Warm oranges and bright yellows to start your day fresh.", colors: { primary: "#FF8C00", secondary: "#FFD700", background: "#FFFACD", text: "#333333" } },
        { name: "Verdant Fields", description: "Lush greens and earthy browns for a natural, grounding feel.", colors: { primary: "#2E8B57", secondary: "#8B4513", background: "#F5F5DC", text: "#2F4F4F" } },
        { name: "Ocean Breeze", description: "Cool blues and sandy beiges for coastal farms.", colors: { primary: "#00BFFF", secondary: "#F4A460", background: "#E0FFFF", text: "#000080" } },
        { name: "Berry Burst", description: "Vibrant reds and purples for a fruity, energetic vibe.", colors: { primary: "#DC143C", secondary: "#8A2BE2", background: "#FFF0F5", text: "#4A0404" } },
        { name: "Golden Wheat", description: "Rich ambers and creamy whites for a warm, rustic atmosphere.", colors: { primary: "#DAA520", secondary: "#CD853F", background: "#FFFAF0", text: "#5C4033" } }
      ];
      const randomTheme = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      setSuggestion({ ...randomTheme, name: randomTheme.name + " (Fallback)" });
    } finally {
      setLoading(false);
    }
  };

  const applyTheme = () => {
    if (!suggestion || !suggestion.colors) return;
    const { primary, secondary, background, text } = suggestion.colors;
    document.documentElement.style.setProperty('--color-primary', primary);
    document.documentElement.style.setProperty('--color-secondary', secondary);
    document.documentElement.style.setProperty('--color-background', background);
    document.documentElement.style.setProperty('--color-text-primary', text);

    // Also set body background and text color to demonstrate the theme change globally
    document.body.style.backgroundColor = background;
    document.body.style.color = text;
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
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: loading ? 'wait' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '15px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.2s'
          }}
        >
          {loading ? 'Generating Idea...' : 'Suggest a Theme'}
        </button>

        {suggestion && suggestion.name && (
          <div style={{
            marginTop: '25px',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            borderLeft: '4px solid #6366F1',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            color: '#1F2937'
          }}>
            <h4 style={{ marginTop: 0 }}>{suggestion.name}</h4>
            <p style={{ margin: '10px 0', fontStyle: 'italic', lineHeight: '1.5' }}>{suggestion.description}</p>

            {suggestion.colors && (
              <div style={{ marginTop: '15px' }}>
                <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Color Palette:</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {Object.entries(suggestion.colors).map(([key, value]) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: value,
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                      }} title={value} />
                      <span style={{ fontSize: '12px', textTransform: 'capitalize' }}>{key}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={applyTheme}
                  style={{
                    backgroundColor: suggestion.colors.primary || '#10B981',
                    color: suggestion.colors.background || 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginTop: '15px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  Apply Theme
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Themes;
