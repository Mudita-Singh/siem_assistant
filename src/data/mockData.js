export const KPI_DATA = [
  { id: 1, title: 'Total Events', value: '1.2M', change: '+12%', type: 'increase' },
  { id: 2, title: 'Critical Alerts', value: '47', change: '-5%', type: 'decrease' },
  { id: 3, title: 'Active Agents', value: '3,492', change: '+2', type: 'increase' },
  { id: 4, title: 'Risk Score', value: '72/100', change: 'High', type: 'neutral' },
];

export const ALERTS_DATA = [
  { id: 'AL-1049', time: '10 mins ago', title: 'Multiple Failed Logins', severity: 'High', source: '192.168.1.45', status: 'Open' },
  { id: 'AL-1048', time: '25 mins ago', title: 'Suspicious PowerShell Execution', severity: 'Critical', source: '10.0.4.12', status: 'Investigating' },
  { id: 'AL-1047', time: '1 hour ago', title: 'Unusual Data Transfer', severity: 'Medium', source: 'DEV-SQL-04', status: 'Closed' },
  { id: 'AL-1046', time: '2 hours ago', title: 'New Admin Account Created', severity: 'Low', source: '10.0.5.22', status: 'Open' },
];

export const LOGS_DATA = [
  { id: 1, timestamp: '2026-03-19 14:22:01', event: 'Authentication Failed', severity: 'Medium', sourceIp: '192.168.1.45', host: 'SRV-AUTH-01' },
  { id: 2, timestamp: '2026-03-19 14:23:15', event: 'Authentication Failed', severity: 'High', sourceIp: '192.168.1.45', host: 'SRV-AUTH-01' },
  { id: 3, timestamp: '2026-03-19 14:25:00', event: 'Brute Force Detected', severity: 'Critical', sourceIp: '91.24.1.201', host: 'SRV-AUTH-01' },
  { id: 4, timestamp: '2026-03-19 15:10:22', event: 'Service Started', severity: 'Low', sourceIp: '10.0.4.12', host: 'DEV-SQL-04' },
  { id: 5, timestamp: '2026-03-19 16:05:40', event: 'Beaconing Activity', severity: 'Critical', sourceIp: '10.0.4.5', host: 'DEV-SQL-04' },
];

export const TRENDS_DATA = {
  labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
  datasets: [
    {
      label: 'Events per hour',
      data: [1200, 1900, 3000, 5000, 4200, 2100],
      borderColor: '#A3FF12',
      backgroundColor: 'rgba(163, 255, 18, 0.1)',
      fill: true,
      tension: 0.4,
    }
  ]
};

export const SEVERITY_DATA = {
  labels: ['Critical', 'High', 'Medium', 'Low'],
  datasets: [
    {
      data: [15, 30, 45, 10],
      backgroundColor: ['#EF4444', '#F97316', '#EAB308', '#22C55E'],
      borderWidth: 0,
    }
  ]
};

export const CATEGORY_DATA = {
  labels: ['Auth', 'Malware', 'Network', 'Policy', 'Web'],
  datasets: [{
    label: 'Alerts by Category',
    data: [42, 19, 27, 34, 15],
    backgroundColor: 'rgba(163, 255, 18, 0.2)',
    borderColor: '#A3FF12',
    borderWidth: 2,
    borderRadius: 6,
  }]
};

export const REPORTS_DATA = [
  { id: 'REP-001', name: 'Weekly Executive Summary', type: 'Executive', date: '2026-03-15', status: 'Generated', format: 'PDF' },
  { id: 'REP-002', name: 'Compliance Audit - HIPAA', type: 'Compliance', date: '2026-03-10', status: 'Generated', format: 'CSV' },
  { id: 'REP-003', name: 'Malware Activity Deep-Dive', type: 'Technical', date: '2026-03-05', status: 'Generated', format: 'PDF' },
  { id: 'REP-004', name: 'Custom Log Export (192.168.1.0/24)', type: 'Log Export', date: '2026-03-18', status: 'Generating...', format: 'CSV' },
];

