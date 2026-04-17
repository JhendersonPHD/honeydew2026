import React, { useState } from 'react';

export const ReferralShare = () => {
  const [copied, setCopied] = useState(false);
  
  const referralCode = 'HONEYDEW2026';
  const referralLink = `https://honeydew.local/register?ref=${referralCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform) => {
    const text = encodeURIComponent(`Join me on HoneyDew and get 10% off your first order! Use code: ${referralCode}`);
    const url = encodeURIComponent(referralLink);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      email: `mailto:?subject=Join HoneyDew&body=Join me on HoneyDew and get 10% off your first order! Use code: ${referralCode}%0A%0A${referralLink}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Referral Program</h3>
      
      <p className="text-sm text-gray-600 mb-4">
        Share HoneyDew with friends and earn 100 points for each referral!
      </p>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Your Referral Code</label>
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={referralCode}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-mono"
          />
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              copied 
                ? 'bg-emerald-500 text-white' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Share via</label>
        <div className="flex gap-2">
          <button
            onClick={() => handleShare('twitter')}
            className="flex-1 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm"
          >
            Twitter
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Facebook
          </button>
          <button
            onClick={() => handleShare('email')}
            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            Email
          </button>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>You've referred <span className="font-bold text-emerald-600">0</span> friends so far</p>
      </div>
    </div>
  );
};
