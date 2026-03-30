import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShieldAlert, FileText, MessageSquare, Settings, Activity } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/assistant', icon: MessageSquare, label: 'AI Assistant' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/alerts', icon: ShieldAlert, label: 'Alerts' },
    { path: '/logs', icon: FileText, label: 'Logs' },
    { path: '/reports', icon: FileText, label: 'Reports' },
  ];

  return (
    <aside className="w-64 bg-siem-card border-r border-siem-border flex flex-col h-full z-20 transition-all duration-300">
      {/* Brand logo area */}
      <div className="h-16 flex items-center px-6 border-b border-siem-border">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-siem-bg border border-siem-border shadow-[0_0_15px_rgba(163,255,18,0.15)]">
            <Activity className="w-5 h-5 text-siem-primary" />
          </div>
          <span className="font-bold text-lg tracking-wide uppercase text-white shadow-siem-primary/20 drop-shadow-md">SILogix</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-siem-primary/10 text-siem-primary shadow-siem-glow' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-siem-primary rounded-r-full shadow-[0_0_10px_#A3FF12]" />
                )}
                
                <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'drop-shadow-[0_0_5px_rgba(163,255,18,0.5)]' : ''}`} />
                <span className="font-medium text-sm tracking-wide">{item.label}</span>
                
                {/* Tooltip on Hover */}
                <div className="absolute left-full ml-4 px-2 py-1 bg-siem-card border border-siem-border rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 text-[10px] uppercase tracking-widest text-gray-400 pointer-events-none shadow-xl">
                  {item.label}
                </div>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Settings */}
      <div className="p-4 border-t border-siem-border">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-white hover:bg-siem-bg/50 transition-all duration-200 group">
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
          <span className="font-medium text-sm tracking-wide">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
