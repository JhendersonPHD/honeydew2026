import React, { useState } from 'react';

export const FeedbackForm = ({ type = 'nps', onSubmit }) => {
  const [score, setScore] = useState(null);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (score === null && type === 'nps') return;

    if (onSubmit) {
      onSubmit({ score, comments });
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Thank you for your feedback!</h3>
        <p className="text-gray-600 text-sm">We appreciate you taking the time to help us improve HoneyDew.</p>
        <p className="text-emerald-600 font-medium text-sm mt-4">We've added 10 points to your account as a thank you!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-2">How was your experience?</h3>
      <p className="text-gray-600 text-sm mb-6">How likely are you to recommend HoneyDew to a friend?</p>

      <form onSubmit={handleSubmit}>
        {type === 'nps' && (
          <div className="mb-6">
            <div className="flex justify-between gap-1 sm:gap-2 mb-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setScore(num)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    score === num
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-amber-100'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 px-1">
              <span>Not likely</span>
              <span>Very likely</span>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What could we do better? (Optional)
          </label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-500 outline-none transition-shadow resize-none"
            placeholder="Tell us about your experience..."
          />
        </div>

        <button
          type="submit"
          disabled={type === 'nps' && score === null}
          className="w-full py-2 px-4 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};
