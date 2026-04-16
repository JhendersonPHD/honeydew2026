"use client";

import React, { useState } from 'react';
import NLPDashboard from '../components/NLPDashboard';
import WidgetDashboard from '../components/WidgetDashboard';
import NotificationSettings from '../components/NotificationSettings';

export default function Page() {
  const [activeView, setActiveView] = useState('widgets');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
          </svg>
          HoneyDew
        </h1>

        <nav className="flex gap-2">
          <button
            onClick={() => setActiveView('widgets')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === 'widgets' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('nlp')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === 'nlp' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Ask AI
          </button>
          <button
            onClick={() => setActiveView('settings')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Settings
          </button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-8">
        {activeView === 'widgets' && <WidgetDashboard />}
        {activeView === 'nlp' && <NLPDashboard />}
        {activeView === 'settings' && <NotificationSettings />}
      </main>
    </div>
  );
}
