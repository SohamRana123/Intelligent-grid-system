import { MapPin, TrendingDown, TrendingUp } from 'lucide-react';

interface NationalHeatmapProps {
  mode: 'AC' | 'DC';
}

export default function NationalHeatmap({ mode }: NationalHeatmapProps) {
  const regions = mode === 'AC' ? [
    { name: 'North', loss: 15.2, x: 45, y: 20, status: 'critical' },
    { name: 'South', loss: 8.7, x: 45, y: 75, status: 'optimal' },
    { name: 'East', loss: 18.9, x: 75, y: 45, status: 'critical' },
    { name: 'West', loss: 11.3, x: 15, y: 50, status: 'warning' },
    { name: 'Central', loss: 13.6, x: 50, y: 45, status: 'warning' },
    { name: 'Northeast', loss: 22.4, x: 80, y: 25, status: 'critical' },
  ] : [
    { name: 'North', loss: 6.8, x: 45, y: 20, status: 'optimal' },
    { name: 'South', loss: 3.2, x: 45, y: 75, status: 'optimal' },
    { name: 'East', loss: 7.9, x: 75, y: 45, status: 'optimal' },
    { name: 'West', loss: 5.1, x: 15, y: 50, status: 'optimal' },
    { name: 'Central', loss: 6.3, x: 50, y: 45, status: 'optimal' },
    { name: 'Northeast', loss: 8.7, x: 80, y: 25, status: 'warning' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'from-red-600 to-red-800';
      case 'warning': return 'from-orange-600 to-orange-800';
      case 'optimal': return 'from-green-600 to-green-800';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  const getGlowColor = (status: string) => {
    switch (status) {
      case 'critical': return 'shadow-red-500/50';
      case 'warning': return 'shadow-orange-500/50';
      case 'optimal': return 'shadow-green-500/50';
      default: return 'shadow-gray-500/50';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-xl p-6 border border-cyan-900/30 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-cyan-400 tracking-wide">NATIONAL HEATMAP</h2>
          <p className="text-xs text-gray-500 mt-1">Real-time T&D Loss Distribution · 3D Grid Visualization</p>
        </div>
        <div className="px-4 py-2 bg-gray-950/50 rounded-lg border border-cyan-900/30">
          <span className="text-xs text-gray-400">MODE: </span>
          <span className={`text-sm font-bold ${mode === 'AC' ? 'text-cyan-400' : 'text-green-400'}`}>{mode}</span>
        </div>
      </div>

      <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-950 to-slate-950 rounded-lg border-2 border-cyan-900/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent" />

        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(34, 211, 238)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {regions.map((region, idx) => (
          <div
            key={idx}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: `${region.x}%`, top: `${region.y}%` }}
          >
            <div className={`absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-br ${getStatusColor(region.status)} opacity-60 blur-2xl ${getGlowColor(region.status)} animate-pulse`} />

            <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${getStatusColor(region.status)} shadow-2xl ${getGlowColor(region.status)} border-2 ${region.status === 'critical' ? 'border-red-400' : region.status === 'warning' ? 'border-orange-400' : 'border-green-400'} flex items-center justify-center transition-all group-hover:scale-125`}>
              <MapPin className="w-8 h-8 text-white" />
            </div>

            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-950/95 rounded-lg px-3 py-2 border border-cyan-900/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-10">
              <div className="text-xs font-bold text-cyan-400 mb-1">{region.name}</div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Loss:</span>
                <span className={`text-sm font-bold font-mono ${region.status === 'critical' ? 'text-red-400' : region.status === 'warning' ? 'text-orange-400' : 'text-green-400'}`}>
                  {region.loss}%
                </span>
                {region.status === 'critical' ? (
                  <TrendingUp className="w-3 h-3 text-red-400" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-green-400" />
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 right-4 space-y-2">
          <div className="flex items-center space-x-2 bg-gray-950/80 px-3 py-1.5 rounded-lg border border-green-900/30">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
            <span className="text-xs text-gray-300">Optimal (&lt;10%)</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-950/80 px-3 py-1.5 rounded-lg border border-orange-900/30">
            <div className="w-3 h-3 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />
            <span className="text-xs text-gray-300">Warning (10-15%)</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-950/80 px-3 py-1.5 rounded-lg border border-red-900/30">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
            <span className="text-xs text-gray-300">Critical (&gt;15%)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 mt-4">
        {regions.map((region, idx) => (
          <div key={idx} className="bg-gray-950/50 rounded-lg p-3 border border-gray-800">
            <div className="text-xs text-gray-500 mb-1">{region.name}</div>
            <div className={`text-lg font-bold font-mono ${region.status === 'critical' ? 'text-red-400' : region.status === 'warning' ? 'text-orange-400' : 'text-green-400'}`}>
              {region.loss}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
