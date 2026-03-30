import React from 'react';
import { Download } from 'lucide-react';

const severityColors = {
  Critical: 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.25)]',
  High: 'bg-orange-500/20 text-orange-400 border border-orange-500/40',
  Medium: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40',
  Low: 'bg-siem-secondary/20 text-siem-secondary border border-siem-secondary/40',
};

const LogsTable = ({ logs }) => {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col">
      <div className="p-6 border-b border-siem-border bg-siem-card flex justify-between items-center">
        <h3 className="text-gray-200 font-bold text-sm uppercase tracking-[0.15em] drop-shadow-sm">Live Security Logs</h3>
         <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3.5 py-1.5 bg-siem-secondary/5 border border-siem-secondary/20 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-siem-secondary animate-blink shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
              <span className="text-[10px] font-bold text-siem-secondary tracking-[0.2em] uppercase">LIVE STREAM</span>
           </div>
           <button className="flex items-center gap-2 text-gray-400 hover:text-siem-primary transition-all text-xs font-bold px-4 py-2 bg-siem-bg border border-siem-border rounded-xl group hover:border-siem-primary/30 active:scale-95">
              <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Export CSV</span>
           </button>
         </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#1a2128] text-gray-300 font-bold border-b border-siem-border">
            <tr>
              <th className="px-6 py-5 uppercase tracking-widest text-[10px]">Timestamp</th>
              <th className="px-6 py-5 uppercase tracking-widest text-[10px]">Event Description</th>
              <th className="px-6 py-4 uppercase tracking-widest text-[10px]">Source IP</th>
              <th className="px-6 py-4 uppercase tracking-widest text-[10px]">Host</th>
              <th className="px-6 py-4 uppercase tracking-widest text-[10px]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-siem-border/30 text-gray-300 font-mono text-xs">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-siem-primary/5 transition-colors cursor-pointer group border-l-2 border-transparent hover:border-siem-primary/50">
                <td className="px-6 py-5 text-gray-400 group-hover:text-gray-200 transition-colors">{log.timestamp}</td>
                <td className="px-6 py-5 font-sans font-bold text-gray-100 group-hover:text-white transition-colors">{log.event}</td>
                <td className="px-6 py-5 text-siem-primary font-bold tracking-tight text-sm">{log.sourceIp}</td>
                <td className="px-6 py-5 text-gray-300 font-sans font-semibold group-hover:text-gray-100">{log.host}</td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] ${severityColors[log.severity]}`}>
                    {log.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsTable;
