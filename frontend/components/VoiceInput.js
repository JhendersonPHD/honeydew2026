"use client";

import React, { useState, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import { initSpeechRecognition, stopSpeechRecognition } from '../utils/voiceCommands';

export default function VoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { sendMessage } = useChat();

  useEffect(() => {
    return () => {
      if (isListening) stopSpeechRecognition();
    };
  }, [isListening]);

  const toggleListening = () => {
    if (isListening) {
      stopSpeechRecognition();
      setIsListening(false);
      if (transcript) {
        sendMessage(transcript);
        setTranscript('');
      }
    } else {
      setTranscript('');
      setIsListening(true);
      initSpeechRecognition(
        (text) => setTranscript(text),
        (finalText) => {
          setIsListening(false);
          if (finalText) {
            sendMessage(finalText);
            setTranscript('');
          }
        },
        () => setIsListening(false)
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <button
        onClick={toggleListening}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'}`}
        aria-label={isListening ? "Stop listening" : "Start voice input"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </button>
      <div className="mt-4 min-h-[24px] text-gray-700 font-medium">
        {isListening ? (transcript || "Listening...") : "Tap to speak"}
      </div>
    </div>
  );
}
