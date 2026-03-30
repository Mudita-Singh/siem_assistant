import React, { useState } from 'react';
import LogsTable from '../components/LogsTable';
import { LOGS_DATA } from '../data/mockData';
import { Search, Filter, Calendar } from 'lucide-react';

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Create a larger fake logs array for demonstration by duplicating mock data
  const expandedLogs = Array.from({ length: 4 }).flatMap((_, i) => 
    LOGS_DATA.map(log => ({ ...log, id: log.id + i * 100 }))
  );

  const filteredLogs = expandedLogs.filter(log => 
    log.event.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.sourceIp.includes(searchTerm) ||
    log.host.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">Security Logs Explorer</h1>
          <p className="text-gray-400 text-sm mt-1 font-medium tracking-wide">Deep-dive into historical and real-time security events</p>
        </div>
      </div>

      {/* Query Bar */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-center shadow-siem-card">
        <div className="flex-1 relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-siem-primary/70 group-focus-within:text-siem-primary transition-colors" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search using KQL or DSL (e.g., host:"SRV-AUTH-01" AND severity:High)' 
            className="w-full bg-[#0D0F12] border border-siem-border rounded-xl pl-12 pr-12 py-4 text-sm text-gray-200 font-mono font-medium focus:outline-none focus:border-siem-primary/50 focus:ring-1 focus:ring-siem-primary/30 shadow-inner group-hover:border-siem-border/80 transition-all placeholder-gray-600"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 cursor-pointer transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#151A1F] border border-siem-border rounded-xl text-sm font-semibold text-gray-300 hover:text-white transition-colors">
            <Calendar className="w-4 h-4" />
            Last 24 Hours
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#151A1F] border border-siem-border rounded-xl text-sm font-semibold text-gray-300 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 animate-in fade-in duration-700 delay-200 fill-mode-both">
        <LogsTable logs={filteredLogs} />
      </div>
    </div>
  );
};

export default Logs;
