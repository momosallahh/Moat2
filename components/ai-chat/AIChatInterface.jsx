'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles, X, Minimize2, Maximize2 } from 'lucide-react';

// Dummy AI responses
const dummyResponses = {
  "show me leads": {
    type: "data",
    message: "Here are your leads for this week:",
    data: {
      total: 47,
      breakdown: "23 from Google, 15 from referrals, 9 organic",
      topSource: "Google Ads"
    }
  },
  "message all leads": {
    type: "action",
    message: "I can send a message to all leads marked 'follow-up'. What would you like to say?",
    action: "compose_message"
  },
  "hours worked yesterday": {
    type: "data",
    message: "Your crew worked a total of 43 hours yesterday:",
    data: {
      crew1: "8 hours",
      crew2: "7.5 hours",
      crew3: "9 hours"
    }
  },
  "summarize today": {
    type: "summary",
    message: "Here's your business summary for today:",
    data: {
      jobs: "5 completed, 2 in progress",
      revenue: "$4,200",
      leads: "12 new inquiries",
      tasks: "8 completed, 15 pending"
    }
  }
};

function MessageBubble({ message, isUser }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] p-4 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-r from-ai-blue to-ai-emerald text-white'
            : 'glass border border-white/10 text-white'
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-ai-blue" />
            <span className="text-xs text-ai-blue font-semibold">AI Assistant</span>
          </div>
        )}
        <p className="text-sm">{message.text}</p>
        {message.data && (
          <div className="mt-3 p-3 bg-dark-light/50 rounded-lg text-xs">
            {Object.entries(message.data).map(([key, value]) => (
              <div key={key} className="flex justify-between py-1">
                <span className="text-gray-400 capitalize">{key.replace('_', ' ')}:</span>
                <span className="text-white font-semibold">{value}</span>
              </div>
            ))}
          </div>
        )}
        {message.action && (
          <button className="mt-3 px-4 py-2 bg-ai-blue rounded-lg text-xs font-semibold hover:bg-ai-emerald transition-colors">
            {message.action === 'compose_message' ? 'Compose Message' : 'Take Action'}
          </button>
        )}
      </div>
    </div>
  );
}

export default function AIChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI assistant. Ask me anything about your business or give me a command.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response;

      // Find matching response
      for (const [key, value] of Object.entries(dummyResponses)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      // Default response
      if (!response) {
        response = {
          type: "acknowledgment",
          message: "I understand. Let me process that for you. In a live environment, I would execute this command through the appropriate API."
        };
      }

      const aiMessage = {
        id: messages.length + 2,
        text: response.message,
        isUser: false,
        timestamp: new Date(),
        data: response.data,
        action: response.action
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-ai-blue to-ai-emerald text-white shadow-2xl hover:shadow-ai-blue/50 transition-all hover:scale-110 z-50 flex items-center justify-center group"
        >
          <Sparkles className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-ai-emerald rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed right-6 z-50 glass border border-white/20 rounded-2xl shadow-2xl transition-all ${
            isMinimized
              ? 'bottom-6 w-80 h-16'
              : 'bottom-6 w-96 h-[600px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-ai-blue to-ai-emerald flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">AI Command Center</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-ai-emerald rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-dark-light rounded-lg transition-colors"
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4 text-gray-400" />
                ) : (
                  <Minimize2 className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-dark-light rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="h-[440px] overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} isUser={message.isUser} />
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="glass border border-white/10 rounded-2xl p-4">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-ai-blue rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-ai-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-ai-blue rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Commands */}
              <div className="px-4 py-2 border-t border-white/10 flex gap-2 overflow-x-auto">
                {['Show leads', 'Summarize today', 'Open tasks'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => {
                      setInput(cmd);
                      setTimeout(() => handleSend(), 100);
                    }}
                    className="px-3 py-1 rounded-full bg-dark-light text-xs text-gray-300 hover:bg-ai-blue hover:text-white transition-colors whitespace-nowrap"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-dark-light transition-colors">
                    <Mic className="w-5 h-5 text-gray-400" />
                  </button>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask anything or give a command..."
                    className="flex-1 bg-dark-light rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-ai-blue"
                  />
                  <button
                    onClick={handleSend}
                    className="p-2 rounded-lg bg-gradient-to-r from-ai-blue to-ai-emerald text-white hover:shadow-lg transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
