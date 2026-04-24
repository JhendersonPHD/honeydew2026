import React, { useState } from 'react';

export const Notifications = () => {
  const [preferences, setPreferences] = useState({
    order_updates: true,
    promotions: false,
    farm_news: true,
    back_in_stock: true
  });
  const [saved, setSaved] = useState(false);

  const handleToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    // Mock API call to PUT /api/notifications/preferences
    setTimeout(() => setSaved(true), 500);
  };

  const RequestPushPermission = () => {
    const handleRequest = () => {
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if(permission === 'granted') alert('Notifications enabled!');
        });
      } else {
        alert('Browser does not support notifications.');
      }
    };

    return (
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-blue-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            Enable Push Notifications
          </h3>
          <p className="text-sm text-blue-800 mt-1">Get instant alerts on your device for order updates and flash sales.</p>
        </div>
        <button
          onClick={handleRequest}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors whitespace-nowrap"
        >
          Enable Now
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Notification Preferences</h1>
      <p className="text-gray-600 mb-8">Manage how and when we contact you.</p>

      <RequestPushPermission />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Email Alerts</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {[
            { id: 'order_updates', label: 'Order Updates', desc: 'Confirmations, shipping alerts, and delivery notifications.' },
            { id: 'promotions', label: 'Promotions & Offers', desc: 'Discounts, rewards, and exclusive sales.' },
            { id: 'farm_news', label: 'Farm News & Seasons', desc: 'Updates from our farmers and seasonal produce guides.' },
            { id: 'back_in_stock', label: 'Back in Stock Alerts', desc: 'Notifications when your wishlisted items are available.' }
          ].map((item) => (
            <div key={item.id} className="p-6 flex items-center justify-between">
              <div className="pr-4">
                <h3 className="font-medium text-gray-900">{item.label}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
              <button
                onClick={() => handleToggle(item.id)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${preferences[item.id] ? 'bg-amber-500' : 'bg-gray-200'}`}
                role="switch"
                aria-checked={preferences[item.id]}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${preferences[item.id] ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 flex items-center justify-between">
          <span className="text-sm text-emerald-600 font-medium opacity-0 transition-opacity" style={{ opacity: saved ? 1 : 0 }}>
            Preferences saved successfully!
          </span>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gray-900 hover:bg-black text-white font-medium rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
