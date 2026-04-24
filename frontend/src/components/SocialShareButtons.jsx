import React from 'react';

export const SocialShareButtons = ({ url, title, description }) => {
  const encodedUrl = encodeURIComponent(url || window.location.href);
  const encodedTitle = encodeURIComponent(title || 'Check out this fresh find on HoneyDew!');
  const encodedDesc = encodeURIComponent(description || 'Farm-to-consumer goods powered by AI.');

  const handleShare = (platform) => {
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedDesc}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url || window.location.href);
        alert('Link copied to clipboard!');
        return;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleShare('facebook')}
        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        aria-label="Share on Facebook"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
        </svg>
      </button>
      <button
        onClick={() => handleShare('twitter')}
        className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
        aria-label="Share on Twitter"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
        </svg>
      </button>
      <button
        onClick={() => handleShare('pinterest')}
        className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
        aria-label="Share on Pinterest"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.65 7.9 6.45 9.36-.1-.8-.18-2.03.04-2.89.2-.77 1.3-5.5 1.3-5.5s-.33-.66-.33-1.64c0-1.54.9-2.69 2.01-2.69.95 0 1.41.71 1.41 1.56 0 .95-.6 2.38-.92 3.7-.26 1.11.56 2.02 1.66 2.02 1.99 0 3.52-2.1 3.52-5.13 0-2.68-1.93-4.56-4.68-4.56-3.18 0-5.05 2.39-5.05 4.85 0 .95.37 1.98.83 2.54.09.11.1.2.07.31-.09.38-.29 1.18-.33 1.34-.05.21-.18.25-.4.15-1.5-.7-2.43-2.9-2.43-4.66 0-3.79 2.75-7.27 7.95-7.27 4.17 0 7.42 2.97 7.42 6.94 0 4.15-2.61 7.48-6.24 7.48-1.22 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1.01 2.34-1.5 3.13 1.25.39 2.58.6 3.96.6 5.52 0 10-4.48 10-10S17.52 2 12 2z"></path>
        </svg>
      </button>
      <button
        onClick={() => handleShare('copy')}
        className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
        aria-label="Copy link"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
        </svg>
      </button>
    </div>
  );
};
