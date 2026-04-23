"use client";

import React, { useState } from 'react';

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    inventoryAlerts: true,
    salesReports: true,
    aiInsights: false,
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
    channels: {
      email: true,
      push: true,
      sms: false
    }
  });

  const handleToggle = (key, category = null) => {
    if (category) {
      setSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [key]: !prev[category][key]
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Preferences</h2>

      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Alert Types</h3>
          <div className="space-y-3">
            {[
              { id: 'inventoryAlerts', label: 'Inventory Alerts', desc: 'Get notified when stock is low.' },
              { id: 'salesReports', label: 'Sales Reports', desc: 'Daily and weekly sales summaries.' },
              { id: 'aiInsights', label: 'AI Insights', desc: 'Proactive recommendations from AI.' }
            ].map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={settings[item.id]} onChange={() => handleToggle(item.id)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Quiet Hours</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium text-gray-800">Enable Quiet Hours</p>
              <p className="text-sm text-gray-500">Mute all non-critical notifications.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={settings.quietHoursEnabled} onChange={() => handleToggle('quietHoursEnabled')} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          {settings.quietHoursEnabled && (
            <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                <input type="time" value={settings.quietHoursStart} onChange={(e) => handleChange('quietHoursStart', e.target.value)} className="border rounded px-2 py-1" />
              </div>
              <span className="text-gray-400 mt-4">to</span>
              <div>
                <label className="block text-xs text-gray-500 mb-1">End Time</label>
                <input type="time" value={settings.quietHoursEnd} onChange={(e) => handleChange('quietHoursEnd', e.target.value)} className="border rounded px-2 py-1" />
              </div>
            </div>
          )}
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Delivery Channels</h3>
          <div className="flex gap-4">
            {['email', 'push', 'sms'].map(channel => (
              <label key={channel} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={settings.channels[channel]} onChange={() => handleToggle(channel, 'channels')} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                <span className="capitalize text-gray-700">{channel}</span>
              </label>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 pt-4 border-t flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );
}
