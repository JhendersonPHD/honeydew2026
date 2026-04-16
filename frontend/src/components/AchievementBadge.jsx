import React from 'react';

export const AchievementBadge = ({ achievement }) => {
  const { name, description, icon, unlocked } = achievement;

  return (
    <div
      className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
        unlocked
          ? 'bg-amber-50 border-amber-300 shadow-md'
          : 'bg-gray-100 border-gray-300 opacity-60'
      }`}
    >
      <span className="text-4xl mb-2">{icon}</span>
      <h3 className={`font-bold text-sm text-center ${unlocked ? 'text-amber-800' : 'text-gray-600'}`}>
        {name}
      </h3>
      <p className={`text-xs text-center mt-1 ${unlocked ? 'text-amber-700' : 'text-gray-500'}`}>
        {description}
      </p>
      {unlocked && (
        <span className="mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
          Unlocked
        </span>
      )}
    </div>
  );
};
