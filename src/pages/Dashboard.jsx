import React from 'react';
import KPICard from '../components/KPIcard';
import ChartCard from '../components/ChartCard';
import LogsTable from '../components/LogsTable';
import { KPI_DATA, TRENDS_DATA, SEVERITY_DATA, LOGS_DATA, CATEGORY_DATA } from '../data/mockData';

const Dashboard = () => {
  const [liveLogs, setLiveLogs] = React.useState(LOGS_DATA);

  // Simulate real-time log streaming
  React.useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        event: ['Firewall Drop', 'DNS Query', 'File Accessed', 'User Login'][Math.floor(Math.random() * 4)],
        severity: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'][Math.floor(Math.random() * 4)],
        sourceIp: `192.168.1.${Math.floor(Math.random() * 254)}`,
        host: ['SRV-PROD-01', 'SRV-DB-02', 'WKSTN-15', 'SRV-AUTH-01'][Math.floor(Math.random() * 4)]
      };
      setLiveLogs(prev => [newLog, ...prev].slice(0, 10));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">Security Overview</h1>
          <p className="text-gray-400 text-sm mt-1 font-medium tracking-wide">Real-time threat landscape and system metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_DATA.map((kpi, index) => (
          <div key={kpi.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-in fade-in fill-mode-both">
            <KPICard {...kpi} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
          <ChartCard title="Attack Trends (24h)" type="line" data={TRENDS_DATA} />
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
          <ChartCard title="Severity Distribution" type="doughnut" data={SEVERITY_DATA} />
        </div>
        <div className="xl:col-span-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400 fill-mode-both">
          <ChartCard title="Top Alert Categories" type="bar" data={CATEGORY_DATA} />
        </div>
      </div>

      <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
        <LogsTable logs={liveLogs} />
      </div>
    </div>
  );
};

export default Dashboard;
