import React from 'react';
import { ChatProvider } from '../hooks/useChat';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>HoneyDew</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>
      </head>
      <body>
        <ChatProvider>
          {children}
        </ChatProvider>
      </body>
    </html>
  );
}
