import React from 'react';

export const StreakCounter = ({ streak }) => {
  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 px-4 py-2 rounded-full border border-orange-200">
      <span className="text-2xl">🔥</span>
      <span className="font-bold text-orange-700">{streak} Day Streak</span>
    </div>
  );
};
