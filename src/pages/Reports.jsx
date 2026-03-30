import React from 'react';
import { FileText, Download, Plus, Clock, ShieldCheck, Filter } from 'lucide-react';
import { REPORTS_DATA } from '../data/mockData';

const Reports = () => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">Security Reports</h1>
          <p className="text-gray-400 text-sm mt-1 font-medium tracking-wide">Generate and manage compliance and analytical summaries</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-siem-primary text-[#052e16] font-bold px-5 py-2.5 rounded-xl hover:bg-[#8ee600] transition-all shadow-[0_0_20px_rgba(163,255,18,0.2)] disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          {isGenerating ? 'Generating...' : 'Generate New Report'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Scheduled Reports', count: '12', icon: Clock, color: 'text-siem-primary' },
          { title: 'Available Templates', count: '8', icon: FileText, color: 'text-yellow-500' },
          { title: 'Compliance Ready', count: '100%', icon: ShieldCheck, color: 'text-siem-secondary' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl border border-siem-border shadow-siem-card">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-siem-bg/50 border border-siem-border shadow-sm`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-siem-border animate-pulse" />
            </div>
            <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">{stat.title}</p>
            <h3 className="text-3xl font-bold font-mono text-white drop-shadow-sm">{stat.count}</h3>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-2xl border border-siem-border overflow-hidden shadow-siem-card">
        <div className="p-6 border-b border-siem-border bg-siem-card flex justify-between items-center">
          <h3 className="text-gray-200 font-bold text-sm uppercase tracking-[0.15em] drop-shadow-sm">Generated Reports Library</h3>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-gray-400 text-xs font-bold cursor-pointer hover:text-white transition-colors uppercase tracking-[0.1em]">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
             </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#1a2128] text-gray-300 font-bold uppercase tracking-[0.15em] text-[10px] border-b border-siem-border">
              <tr>
                <th className="px-6 py-5">Report Name</th>
                <th className="px-6 py-5">Classification</th>
                <th className="px-6 py-5">Generation Date</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Format</th>
                <th className="px-6 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-siem-border/50 text-gray-300 font-mono text-xs">
              {REPORTS_DATA.map((report) => (
                <tr key={report.id} className="hover:bg-siem-primary/5 transition-colors cursor-pointer group border-l-2 border-transparent hover:border-siem-primary/50">
                  <td className="px-6 py-5 font-bold text-gray-200 group-hover:text-white transition-colors tracking-tight">{report.name}</td>
                  <td className="px-6 py-5 font-sans font-medium">
                    <span className="text-gray-400 uppercase text-[11px] tracking-widest">{report.type}</span>
                  </td>
                  <td className="px-6 py-5 text-gray-500 font-mono text-xs">{report.date}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] ${
                      report.status.includes('...') ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-siem-secondary/10 text-siem-secondary border border-siem-secondary/20'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                     <span className="text-siem-primary font-bold tracking-tight">{report.format}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2.5 text-gray-400 hover:text-siem-primary hover:bg-siem-primary/10 rounded-xl transition-all group-hover:scale-110 active:scale-95 border border-transparent hover:border-siem-primary/20">
                      <Download className="w-4.5 h-4.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
