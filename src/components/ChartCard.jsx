import React from 'react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement, Title, Tooltip, Filler, Legend
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement,
  Title, Tooltip, Filler, Legend
);

const ChartCard = ({ title, type, data }) => {
  const chartRef = React.useRef(null);
  const [chartData, setChartData] = React.useState(data);

  React.useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    if (type === 'line') {
      const ctx = chart.canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(163, 255, 18, 0.3)');
      gradient.addColorStop(1, 'rgba(163, 255, 18, 0)');

      setChartData({
        ...data,
        datasets: data.datasets.map(ds => ({
          ...ds,
          backgroundColor: gradient,
          cubicInterpolationMode: 'monotone',
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: '#A3FF12',
          pointBorderColor: '#151A1F',
          pointBorderWidth: 2.5,
          borderWidth: 3,
        }))
      });
    }
  }, [data, type]);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: type === 'doughnut',
        position: 'bottom',
        labels: { 
          color: '#9CA3AF', 
          usePointStyle: true,
          padding: 20,
          font: { family: 'Inter', size: 11, weight: '500' } 
        }
      },
      tooltip: {
        backgroundColor: '#151A1F',
        titleFont: { family: 'Inter', size: 12, weight: 'bold' },
        bodyFont: { family: 'JetBrains Mono', size: 11 },
        padding: 12,
        borderColor: '#1F2933',
        borderWidth: 1.5,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== undefined) {
              label += context.parsed.y;
            } else if (context.parsed !== undefined) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((context.parsed / total) * 100).toFixed(1) + '%';
              label += `${context.parsed} (${percentage})`;
            }
            return label;
          }
        }
      }
    },
    scales: type !== 'doughnut' ? {
      x: { 
        grid: { color: 'rgba(255, 255, 255, 0.08)', drawBorder: false }, 
        ticks: { color: '#9CA3AF', font: { size: 11, family: 'Inter' } } 
      },
      y: { 
        grid: { color: 'rgba(255, 255, 255, 0.08)', drawBorder: false }, 
        ticks: { color: '#9CA3AF', font: { size: 11, family: 'Inter' } } 
      }
    } : {}
  };

  const renderChart = () => {
    switch(type) {
      case 'line': return <Line ref={chartRef} data={chartData} options={commonOptions} />;
      case 'bar': return <Bar data={data} options={commonOptions} />;
      case 'doughnut': return <Doughnut data={data} options={commonOptions} />;
      default: return null;
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 h-[22.5rem] flex flex-col border border-siem-border shadow-siem-card group hover:border-siem-primary/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-gray-300 font-bold text-xs uppercase tracking-[0.2em] shrink-0">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Live</span>
          <div className="w-1.5 h-1.5 rounded-full bg-siem-primary shadow-[0_0_8px_#A3FF12] animate-pulse" />
        </div>
      </div>
      <div className="flex-1 relative w-full h-full min-h-0">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartCard;
