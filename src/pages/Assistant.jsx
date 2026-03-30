import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';

const Assistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: 'Welcome to the AI-powered SIEM Assistant. I am analyzing the live environment. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);


  const suggestions = [
    "Show failed login attempts",
    "Detect brute-force activity",
    "Summarize critical alerts",
    "Any beaconing detected?"
  ];

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    // Add user message
    const newMsg = { id: Date.now(), role: 'user', text };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let reply = "I've analyzed the logs and found no unusual activity matching that description.";
      if (text.toLowerCase().includes("failed login") || text.toLowerCase().includes("brute-force")) {
        reply = "I detected multiple failed login attempts on SRV-AUTH-01 from IP 192.168.1.45. This matches a brute-force attack profile. I recommend blocking this IP immediately.";
      }
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: reply }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col pt-2 pb-6 animate-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-xl bg-siem-primary/10 border border-siem-primary/20 shadow-siem-glow">
          <Sparkles className="w-6 h-6 text-siem-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">AI Security Assistant</h1>
          <p className="text-gray-400 text-sm mt-1 font-medium tracking-wide">Intelligent threat analysis and incident response support</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden border border-siem-border shadow-soft-xl">
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 max-w-[85%] animate-in fade-in slide-in-from-bottom-2 ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-lg ${
                msg.role === 'user' ? 'bg-siem-primary/20 border border-siem-primary/30' : 'bg-siem-card border border-siem-border'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-siem-primary" /> : <Bot className="w-4 h-4 text-siem-primary" />}
              </div>
              <div className={`p-4 rounded-2xl leading-relaxed text-sm shadow-sm font-medium tracking-wide ${
                msg.role === 'user' 
                ? 'bg-siem-primary/10 border border-siem-primary/25 text-white rounded-tr-none' 
                : 'bg-siem-card border border-siem-border text-gray-200 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 max-w-[85%] animate-in fade-in">
              <div className="w-8 h-8 rounded-lg bg-siem-card border border-siem-border flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-siem-primary" />
              </div>
              <div className="p-4 rounded-2xl bg-siem-card border border-siem-border rounded-tl-none flex items-center gap-1.5 h-12 shadow-sm">
                <span className="w-1.5 h-1.5 bg-siem-primary rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-siem-primary rounded-full animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 bg-siem-primary rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestions & Input Container */}
        <div className="p-6 pt-0 bg-gradient-to-t from-[#151A1F] to-transparent">
          {messages.length === 1 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {suggestions.map((sug, i) => (
                <button 
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold rounded-full bg-siem-bg border border-siem-border text-gray-500 hover:text-siem-primary hover:border-siem-primary/50 transition-all duration-300"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex items-center gap-3 bg-[#0D0F12]/80 backdrop-blur-md border border-siem-border rounded-xl p-2 focus-within:border-siem-primary/40 focus-within:ring-1 focus-within:ring-siem-primary/20 transition-all shadow-inner group"
          >
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask the SIEM AI to run a query, investigate an alert, or summarize logs..." 
              className="flex-1 bg-transparent border-none text-gray-200 text-sm placeholder-gray-600 px-3 focus:outline-none"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-siem-primary/10 text-siem-primary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-siem-primary hover:text-siem-bg transition-all duration-300"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Assistant;
