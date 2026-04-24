import React, { useState } from 'react';
import { logEvent } from './Analytics';

function ReferralSystem() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'GROW2026';

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://honeydew.local/ref/${referralCode}`);
    setCopied(true);
    logEvent('referral_link_copied', { referralCode });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Refer a Friend</h2>
      <p>Give $10, Get $10 when your friends make their first purchase!</p>

      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
        <h3>Your Referral Code: {referralCode}</h3>
        <button onClick={handleCopy} style={{ padding: '0.5rem 1rem', background: '#F59E0B', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>

      <div>
        <h3>Your Referrals</h3>
        <p>0 friends referred</p>
      </div>
    </div>
  );
}

export default ReferralSystem;
