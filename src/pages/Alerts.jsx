import React, { useState } from 'react';
import { ALERTS_DATA } from '../data/mockData';
import AlertPanel from '../components/AlertPanel';
import { Filter, Download } from 'lucide-react';

const severityColors = {
  Critical: 'bg-red-500/10 text-red-500 border-red-500/20',
  High: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  Medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  Low: 'bg-siem-secondary/10 text-siem-secondary border-siem-secondary/20',
};

const Alerts = () => {
  const [filter, setFilter] = useState('All');
  const [selectedAlert, setSelectedAlert] = useState(null);

  const filteredAlerts = filter === 'All' 
    ? ALERTS_DATA 
    : ALERTS_DATA.filter(a => a.severity === filter);

  return (
    <div className="h-full flex flex-col pb-10 animate-in fade-in duration-500 lg:relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">Security Alerts</h1>
          <p className="text-gray-400 text-sm mt-1 font-medium tracking-wide">Manage and investigate system-wide security notifications</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-gray-400 hover:text-siem-primary transition-colors text-xs font-bold px-4 py-2 bg-siem-card border border-siem-border rounded-xl group">
             <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
             <span>Export Alerts</span>
          </button>

          <div className="flex items-center gap-2 bg-[#1a2128] border border-siem-border rounded-xl p-1.5 shadow-sm">
            <Filter className="w-4 h-4 text-gray-500 ml-2" />
            {['All', 'Critical', 'High', 'Medium', 'Low'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                  filter === f 
                  ? 'bg-siem-card text-siem-primary shadow-siem-glow ring-1 ring-siem-primary/20' 
                  : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-2xl overflow-hidden flex flex-col shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1a2128] border-b border-siem-border text-gray-300 font-bold uppercase tracking-[0.15em] text-[10px]">
              <tr>
                <th className="px-6 py-5">Alert ID</th>
                <th className="px-6 py-5">Timestamp</th>
                <th className="px-6 py-5">Detection Name</th>
                <th className="px-6 py-5">Source Endpoint</th>
                <th className="px-6 py-5">Priority</th>
                <th className="px-6 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-siem-border/50 text-gray-300 font-sans text-sm">
              {filteredAlerts.length > 0 ? filteredAlerts.map((alert) => (
                <tr 
                  key={alert.id} 
                  onClick={() => setSelectedAlert(alert)}
                  className={`hover:bg-siem-primary/5 transition-colors cursor-pointer group ${selectedAlert?.id === alert.id ? 'bg-siem-primary/5' : ''}`}
                >
                  <td className="px-6 py-5 font-mono text-[11px] font-bold text-siem-primary tracking-tight">{alert.id}</td>
                  <td className="px-6 py-5 text-gray-500 font-mono text-xs">{alert.time}</td>
                  <td className="px-6 py-5 font-bold text-gray-200 group-hover:text-white transition-colors">{alert.title}</td>
                  <td className="px-6 py-5 font-mono text-xs text-gray-400 font-medium">{alert.source}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] border ${severityColors[alert.severity]}`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-6 py-5 flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full shadow-sm ${alert.status === 'Open' ? 'bg-red-500' : alert.status === 'Closed' ? 'bg-siem-secondary' : 'bg-yellow-500'}`} />
                    <span className="text-gray-400 text-[11px] uppercase tracking-widest font-bold">{alert.status}</span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 italic">No alerts found for this severity.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Alert Panel */}
      <AlertPanel alert={selectedAlert} onClose={() => setSelectedAlert(null)} />
    </div>
  );
};

export default Alerts;
