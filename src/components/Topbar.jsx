import React, { useState, useEffect } from 'react';
import { Bell, Search, User } from 'lucide-react';

const Topbar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 bg-siem-bg/80 backdrop-blur-md border-b border-siem-border flex items-center justify-between px-6 z-20 sticky top-0">
      
      {/* Search Bar */}
      <div className="max-w-md w-full relative group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-siem-primary transition-colors" />
        <input 
          type="text" 
          placeholder="Search alerts, logs, or IPs..." 
          className="w-full bg-siem-card border border-siem-border rounded-xl pl-11 pr-5 py-2.5 text-sm text-gray-200 font-medium placeholder-gray-500 focus:outline-none focus:border-siem-primary/50 focus:ring-1 focus:ring-siem-primary/30 transition-all shadow-sm"
        />
      </div>

      {/* Right Side Info */}
      <div className="flex items-center gap-6">
        
        {/* Connection Status */}
        <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-xl bg-siem-card border border-siem-border shadow-sm">
          <div className="w-2 h-2 rounded-full bg-siem-secondary shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse" />
          <span className="text-xs font-mono font-bold text-gray-200 tracking-tight">Wazuh: Connected</span>
        </div>

        {/* Live Clock */}
        <div className="hidden lg:block text-xs font-mono font-bold text-gray-400 tracking-widest tabular-nums uppercase">
          {time}
        </div>

        <div className="h-6 w-px bg-siem-border"></div>

        {/* Action icons */}
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] border border-siem-bg" />
        </button>

        {/* User Profile */}
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-siem-card border border-siem-border hover:border-gray-500 transition-colors">
          <User className="w-4 h-4 text-gray-300" />
        </button>
      </div>

    </header>
  );
};

export default Topbar;
