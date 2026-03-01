import { PieChart } from 'lucide-react';

interface LossDecompositionProps {
  mode: 'AC' | 'DC';
}

export default function LossDecomposition({ mode }: LossDecompositionProps) {
  const acData = {
    technical: 58,
    commercial: 42,
  };

  const dcData = {
    technical: 72,
    commercial: 28,
  };

  const data = mode === 'AC' ? acData : dcData;

  const technicalAngle = (data.technical / 100) * 360;
  const commercialAngle = (data.commercial / 100) * 360;

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-xl p-6 border border-cyan-900/30 backdrop-blur-sm h-full">
      <div className="flex items-center space-x-2 mb-6">
        <PieChart className="w-5 h-5 text-cyan-400" />
        <h2 className="text-xl font-bold text-cyan-400 tracking-wide">LOSS DECOMPOSITION</h2>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="rgb(220, 38, 38)"
              strokeWidth="40"
              strokeDasharray={`${(technicalAngle / 360) * 502.65} 502.65`}
              className="drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="rgb(249, 115, 22)"
              strokeWidth="40"
              strokeDasharray={`${(commercialAngle / 360) * 502.65} 502.65`}
              strokeDashoffset={`-${(technicalAngle / 360) * 502.65}`}
              className="drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="rgb(3, 7, 18)"
              className="drop-shadow-2xl"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 font-mono">100%</div>
              <div className="text-xs text-gray-500 mt-1">TOTAL LOSS</div>
            </div>
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className="bg-gradient-to-r from-red-900/30 to-red-950/30 rounded-lg p-4 border border-red-900/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Technical Losses</span>
              <span className="text-2xl font-bold text-red-400 font-mono">{data.technical}%</span>
            </div>
            <div className="w-full h-2 bg-gray-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-500/50"
                style={{ width: `${data.technical}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">Transmission · Distribution · Infrastructure</div>
          </div>

          <div className="bg-gradient-to-r from-orange-900/30 to-orange-950/30 rounded-lg p-4 border border-orange-900/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Commercial Losses</span>
              <span className="text-2xl font-bold text-orange-400 font-mono">{data.commercial}%</span>
            </div>
            <div className="w-full h-2 bg-gray-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg shadow-orange-500/50"
                style={{ width: `${data.commercial}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">Theft · Billing Errors · Meter Tampering</div>
          </div>
        </div>

        <div className="w-full bg-gray-950/50 rounded-lg p-3 border border-cyan-900/30">
          <div className="text-xs text-gray-400 mb-1">AI RECOMMENDATION</div>
          <div className="text-sm text-cyan-400">
            {mode === 'AC'
              ? 'Deploy smart meters in high-loss zones for theft detection'
              : 'DC infrastructure reduces technical losses by 38% on average'
            }
          </div>
        </div>
      </div>
    </div>
  );
}
