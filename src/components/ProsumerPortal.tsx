import { Users, TrendingDown, DollarSign, Zap } from 'lucide-react';

interface ProsumerPortalProps {
  mode: 'AC' | 'DC';
}

export default function ProsumerPortal({ mode }: ProsumerPortalProps) {
  const consumers = mode === 'AC' ? [
    { id: 'C-8472', name: 'Residential Zone A', consumption: 847, savings: 127, efficiency: 73 },
    { id: 'C-3918', name: 'Industrial Park B', consumption: 3421, savings: 89, efficiency: 68 },
    { id: 'C-7251', name: 'Commercial District', consumption: 1893, savings: 234, efficiency: 81 },
    { id: 'C-5604', name: 'Tech Hub Campus', consumption: 2156, savings: 312, efficiency: 87 },
  ] : [
    { id: 'C-8472', name: 'Residential Zone A', consumption: 798, savings: 176, efficiency: 89 },
    { id: 'C-3918', name: 'Industrial Park B', consumption: 3187, savings: 323, efficiency: 91 },
    { id: 'C-7251', name: 'Commercial District', consumption: 1742, savings: 385, efficiency: 94 },
    { id: 'C-5604', name: 'Tech Hub Campus', consumption: 1989, savings: 479, efficiency: 96 },
  ];

  const CircularGauge = ({ value, label, color }: { value: number; label: string; color: string }) => {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="45"
            fill="none"
            stroke="rgb(31, 41, 55)"
            strokeWidth="10"
          />
          <circle
            cx="64"
            cy="64"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 drop-shadow-[0_0_8px_currentColor]"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold font-mono" style={{ color }}>
            {value}%
          </div>
          <div className="text-xs text-gray-500">{label}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-xl p-6 border border-cyan-900/30 backdrop-blur-sm">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-5 h-5 text-cyan-400" />
        <h2 className="text-xl font-bold text-cyan-400 tracking-wide">PROSUMER PORTAL</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {consumers.map((consumer, idx) => (
          <div
            key={idx}
            className="bg-gray-950/50 rounded-lg p-4 border border-gray-800 hover:border-cyan-900/50 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">{consumer.id}</div>
                <div className="text-sm font-bold text-gray-300">{consumer.name}</div>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <CircularGauge
                value={consumer.efficiency}
                label="Efficiency"
                color={consumer.efficiency >= 85 ? 'rgb(34, 197, 94)' : consumer.efficiency >= 70 ? 'rgb(234, 179, 8)' : 'rgb(239, 68, 68)'}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-900/50 rounded px-3 py-2">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-gray-400">Usage</span>
                </div>
                <span className="text-sm font-bold text-cyan-400 font-mono">{consumer.consumption} kWh</span>
              </div>

              <div className="flex items-center justify-between bg-green-950/20 rounded px-3 py-2 border border-green-900/30">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-400">Savings</span>
                </div>
                <span className="text-sm font-bold text-green-400 font-mono">₹{consumer.savings}</span>
              </div>

              <div className="flex items-center justify-between bg-cyan-950/20 rounded px-3 py-2 border border-cyan-900/30">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-gray-400">Loss Reduction</span>
                </div>
                <span className="text-sm font-bold text-cyan-400 font-mono">
                  {mode === 'AC' ? '12%' : '47%'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-950/30 to-green-900/30 rounded-lg p-4 border border-green-900/50">
          <div className="text-xs text-gray-400 mb-1">TOTAL SAVINGS</div>
          <div className="text-2xl font-bold text-green-400 font-mono">
            ₹{consumers.reduce((sum, c) => sum + c.savings, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-gradient-to-br from-cyan-950/30 to-cyan-900/30 rounded-lg p-4 border border-cyan-900/50">
          <div className="text-xs text-gray-400 mb-1">AVG EFFICIENCY</div>
          <div className="text-2xl font-bold text-cyan-400 font-mono">
            {Math.round(consumers.reduce((sum, c) => sum + c.efficiency, 0) / consumers.length)}%
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-950/30 to-purple-900/30 rounded-lg p-4 border border-purple-900/50">
          <div className="text-xs text-gray-400 mb-1">ACTIVE PROSUMERS</div>
          <div className="text-2xl font-bold text-purple-400 font-mono">{consumers.length}</div>
        </div>
      </div>
    </div>
  );
}
