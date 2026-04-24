import React from 'react';

export const PointsHistory = ({ history = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Points History</h3>
      {history.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No points history yet. Start shopping or referring friends to earn points!
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 rounded-lg bg-gray-50 hover:bg-amber-50 transition-colors">
              <div>
                <p className="font-medium text-gray-800">{item.description}</p>
                <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
              </div>
              <div className={`font-bold text-lg ${item.type === 'earned' || item.points > 0 ? 'text-emerald-600' : 'text-gray-600'}`}>
                {item.points > 0 ? '+' : ''}{item.points}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
