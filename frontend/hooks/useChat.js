"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback((content) => {
    // Add user message
    const userMsg = { role: 'user', content };
    setMessages(prev => [...prev, userMsg]);

    // Simulate AI thinking and response
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "I'm here to help with your Shopify store analytics.";
      const lowerContent = content.toLowerCase();

      if (lowerContent.includes('inventory') || lowerContent.includes('stock')) {
        aiResponse = "Currently, you have 3 low stock items: Wireless Earbuds, Phone Case (Black), and USB-C Cable.";
      } else if (lowerContent.includes('sale')) {
        aiResponse = "Total sales today are $12,450 from 145 orders. This is up 12% from yesterday.";
      } else if (lowerContent.includes('report') || lowerContent.includes('export')) {
        aiResponse = "I've generated the report. You can download it via this link: [Download Report]";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  }, []);

  const value = {
    messages,
    sendMessage,
    isTyping
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
