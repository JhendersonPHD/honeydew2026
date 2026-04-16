"use client";

import React, { useState } from 'react';
import ChatInterface from './ChatInterface';
import VoiceInput from './VoiceInput';

export default function NLPDashboard() {
  const [activeTab, setActiveTab] = useState('text');

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <h2 className="text-xl font-bold text-gray-800">Natural Language Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Ask questions in plain English to get instant visual responses.</p>

        <div className="flex mt-4 bg-gray-200 p-1 rounded-lg w-max">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'text' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('voice')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'voice' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Voice
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === 'text' ? (
          <div className="h-full p-4">
            <ChatInterface />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-50">
            <VoiceInput />
          </div>
        )}
      </div>
    </div>
  );
}
