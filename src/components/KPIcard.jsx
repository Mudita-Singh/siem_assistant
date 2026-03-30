import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const KPICard = ({ title, value, change, type }) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  const numericValue = parseFloat(value.replace(/,/g, '')) || 0;
  const suffix = value.match(/[A-Z%+/]+$/i)?.[0] || '';

  React.useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = numericValue / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-siem-border hover:border-siem-primary/30 shadow-siem-card">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-siem-primary/5 rounded-full blur-2xl group-hover:bg-siem-primary/10 transition-colors" />
      
      <p className="text-gray-400 font-semibold text-[11px] mb-3 uppercase tracking-[0.2em]">{title}</p>
      <h3 className="text-4xl font-bold font-mono tracking-tight text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)] group-hover:text-siem-primary transition-colors">
        {displayValue.toLocaleString()}{suffix}
      </h3>

      
      <div className="flex items-center gap-3">
        <span className={`flex items-center text-xs font-bold px-2.5 py-1 rounded-lg ${
          type === 'increase' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
          type === 'decrease' ? 'bg-siem-secondary/10 text-siem-secondary border border-siem-secondary/20' :
          'bg-gray-500/10 text-gray-500 border border-gray-500/20'
        }`}>
          {type === 'increase' ? <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> :
           type === 'decrease' ? <ArrowDownRight className="w-3.5 h-3.5 mr-1" /> :
           <Minus className="w-3.5 h-3.5 mr-1" />}
          {change}
        </span>
        <span className="text-xs text-gray-500 font-medium tracking-wide">vs last hour</span>
      </div>
    </div>
  );
};

export default KPICard;
