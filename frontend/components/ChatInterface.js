"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../hooks/useChat';

export default function ChatInterface() {
  const { messages, sendMessage, isTyping } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full border rounded-lg bg-white shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
        <h3 className="font-semibold text-lg text-gray-800">AI Assistant</h3>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Online</span>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3 min-h-[300px]">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 my-auto">
            <p>How can I help you today?</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white self-end rounded-br-none' : 'bg-white text-gray-800 border self-start rounded-bl-none'}`}>
              <p className="text-sm">{msg.content}</p>
            </div>
          ))
        )}

        {isTyping && (
          <div className="bg-white text-gray-800 border self-start rounded-lg rounded-bl-none p-3 max-w-[80%] flex gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t bg-white">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2 no-scrollbar">
          {['Show inventory', 'Recent sales', 'Low stock items'].map((action, i) => (
            <button key={i} onClick={() => sendMessage(action)} className="whitespace-nowrap text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors border border-gray-200">
              {action}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
          />
          <button type="submit" disabled={!input.trim()} className="bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-medium disabled:opacity-50 hover:bg-blue-700 transition-colors">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
