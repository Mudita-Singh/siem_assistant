import React from 'react';
import { X, Clock, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

const AlertPanel = ({ alert, onClose }) => {
  if (!alert) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0D0F12] border-l border-siem-border z-50 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-siem-border flex justify-between items-center bg-siem-card">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              alert.severity === 'Critical' ? 'bg-red-500/15 text-red-500' :
              alert.severity === 'High' ? 'bg-orange-500/15 text-orange-500' :
              alert.severity === 'Medium' ? 'bg-yellow-500/15 text-yellow-500' :
              'bg-siem-secondary/15 text-siem-secondary'
            }`}>
              <ShieldAlert className="w-5.5 h-5.5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide drop-shadow-sm">{alert.id}</h2>
              <span className="text-xs text-gray-400 font-mono font-medium">{alert.time}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-white hover:bg-siem-bg rounded-lg transition-colors group">
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Details */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-300 border-b border-siem-border pb-3">Full Details</h3>
            <div className="space-y-3.5 bg-siem-card p-5 rounded-xl border border-siem-border shadow-siem-card">
              <div className="flex justify-between items-start">
                <span className="text-gray-400 text-sm font-medium">Detection Name</span>
                <span className="text-gray-200 font-semibold text-right text-sm">{alert.title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm font-medium">Source IP</span>
                <span className="text-siem-primary font-mono text-sm font-bold tracking-tight">{alert.source}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm font-medium">Target Host</span>
                <span className="text-gray-200 font-mono text-sm">SRV-PROD-01</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm font-medium">Framework</span>
                <span className="text-gray-200 text-sm font-medium">MITRE ATT&CK</span>
              </div>
            </div>
          </section>

          {/* AI Suggestion */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-siem-primary border-b border-siem-border pb-3 flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5" />
              AI Analysis
            </h3>
            <div className="bg-siem-primary/5 border border-siem-primary/20 p-5 rounded-xl shadow-siem-glow">
              <p className="text-sm text-gray-200 leading-relaxed font-medium">
                This behavior matches known patterns for automated credential stuffing. The source IP <span className="font-bold text-siem-primary">{alert.source}</span> has attempted 45 distinct user logins in the past 10 minutes. 
              </p>
              <div className="mt-5 flex gap-3">
                <button className="flex-1 bg-siem-primary text-[#052e16] font-bold text-sm py-2.5 rounded-lg hover:bg-[#8ee600] transition-all hover:shadow-siem-glow active:scale-95">
                  Block IP
                </button>
                <button className="flex-1 bg-transparent border border-siem-border text-gray-300 font-bold text-sm py-2.5 rounded-lg hover:text-white hover:bg-siem-bg transition-all active:scale-95">
                  Isolate Host
                </button>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 border-b border-siem-border pb-2">Timeline</h3>
            <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-siem-border">
              
              <div className="relative">
                <div className="absolute left-[-29px] w-4 h-4 rounded-full bg-siem-bg border-2 border-siem-secondary" />
                <div className="text-xs font-mono text-siem-secondary mb-1">10:45 AM</div>
                <div className="text-sm text-gray-300">Initial connection established</div>
              </div>

              <div className="relative">
                <div className="absolute left-[-29px] w-4 h-4 rounded-full bg-siem-bg border-2 border-yellow-500" />
                <div className="text-xs font-mono text-yellow-500 mb-1">10:47 AM</div>
                <div className="text-sm text-gray-300">Multiple auth failures started</div>
              </div>

              <div className="relative">
                <div className="absolute left-[-29px] w-4 h-4 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                <div className="text-xs font-bold font-mono text-red-400 mb-1">10:55 AM</div>
                <div className="text-sm text-white font-bold tracking-wide">Alert Triggered</div>
              </div>

            </div>
          </section>

          {/* Raw Data */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 border-b border-siem-border pb-2">Raw Event Data</h3>
            <div className="bg-black/40 p-4 rounded-xl border border-siem-border/30 font-mono text-[10px] text-gray-400 overflow-x-auto">
              <pre>
                {JSON.stringify({
                  event_id: alert.id,
                  timestamp: alert.time,
                  source_ip: alert.source,
                  host: "SRV-PROD-01",
                  user: "administrator",
                  log_type: "winevt",
                  event_code: 4625,
                  status: "failure"
                }, null, 2)}
              </pre>
            </div>
          </section>

        </div>
      </div>
    </>
  );
};

export default AlertPanel;
