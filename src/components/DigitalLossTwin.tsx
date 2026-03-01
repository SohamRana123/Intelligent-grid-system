import { Cpu, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface DigitalLossTwinProps {
  mode: 'AC' | 'DC';
}

export default function DigitalLossTwin({ mode }: DigitalLossTwinProps) {
  const transformers = mode === 'AC' ? [
    { id: 'T-4782', health: 42, status: 'critical', temp: 94, load: 127 },
    { id: 'T-3391', health: 78, status: 'warning', temp: 76, load: 89 },
    { id: 'T-5629', health: 95, status: 'optimal', temp: 62, load: 71 },
    { id: 'T-8104', health: 88, status: 'optimal', temp: 68, load: 82 },
    { id: 'T-2457', health: 51, status: 'warning', temp: 88, load: 115 },
  ] : [
    { id: 'T-4782', health: 89, status: 'optimal', temp: 58, load: 72 },
    { id: 'T-3391', health: 92, status: 'optimal', temp: 54, load: 68 },
    { id: 'T-5629', health: 97, status: 'optimal', temp: 51, load: 65 },
    { id: 'T-8104', health: 94, status: 'optimal', temp: 56, load: 70 },
    { id: 'T-2457', health: 86, status: 'optimal', temp: 62, load: 78 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      case 'optimal': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return null;
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'from-green-600 to-green-500';
    if (health >= 60) return 'from-orange-600 to-orange-500';
    return 'from-red-600 to-red-500';
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-xl p-6 border border-cyan-900/30 backdrop-blur-sm">
      <div className="flex items-center space-x-2 mb-6">
        <Cpu className="w-5 h-5 text-cyan-400" />
        <h2 className="text-xl font-bold text-cyan-400 tracking-wide">DIGITAL LOSS TWIN</h2>
      </div>

      <div className="space-y-3">
        {transformers.map((transformer, idx) => (
          <div
            key={idx}
            className="bg-gray-950/50 rounded-lg p-4 border border-gray-800 hover:border-cyan-900/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getStatusIcon(transformer.status)}
                <span className="text-sm font-bold text-gray-300 font-mono">{transformer.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">HEALTH</span>
                <span className={`text-lg font-bold font-mono ${transformer.health >= 80 ? 'text-green-400' : transformer.health >= 60 ? 'text-orange-400' : 'text-red-400'}`}>
                  {transformer.health}%
                </span>
              </div>
            </div>

            <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full bg-gradient-to-r ${getHealthColor(transformer.health)} shadow-lg transition-all`}
                style={{ width: `${transformer.health}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-900/50 rounded px-2 py-1.5">
                <div className="text-xs text-gray-500">TEMP</div>
                <div className={`text-sm font-bold font-mono ${transformer.temp > 80 ? 'text-red-400' : 'text-cyan-400'}`}>
                  {transformer.temp}°C
                </div>
              </div>
              <div className="bg-gray-900/50 rounded px-2 py-1.5">
                <div className="text-xs text-gray-500">LOAD</div>
                <div className={`text-sm font-bold font-mono ${transformer.load > 100 ? 'text-red-400' : 'text-green-400'}`}>
                  {transformer.load}%
                </div>
              </div>
              <div className="bg-gray-900/50 rounded px-2 py-1.5">
                <div className="text-xs text-gray-500">STATUS</div>
                <div className={`text-xs font-bold uppercase ${transformer.status === 'critical' ? 'text-red-400' : transformer.status === 'warning' ? 'text-orange-400' : 'text-green-400'}`}>
                  {transformer.status}
                </div>
              </div>
            </div>

            {transformer.status === 'critical' && (
              <div className="mt-3 bg-red-950/30 border border-red-900/50 rounded-lg p-2">
                <div className="text-xs text-red-400 font-bold">⚡ AI REROUTING INITIATED</div>
                <div className="text-xs text-gray-400 mt-1">Load redistributed to T-{(parseInt(transformer.id.split('-')[1]) + 1000).toString()}</div>
              </div>
            )}

            {transformer.status === 'warning' && (
              <div className="mt-3 bg-orange-950/30 border border-orange-900/50 rounded-lg p-2">
                <div className="text-xs text-orange-400 font-bold">⚠ PREVENTIVE MAINTENANCE SCHEDULED</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 bg-gradient-to-r from-cyan-950/30 to-cyan-900/30 rounded-lg p-3 border border-cyan-900/50">
        <div className="text-xs text-gray-400 mb-1">PREDICTIVE ANALYTICS</div>
        <div className="text-sm text-cyan-400">
          {mode === 'AC'
            ? 'T-4782 predicted failure within 72h · Immediate intervention required'
            : 'All transformers operating within optimal parameters'
          }
        </div>
      </div>
    </div>
  );
}
