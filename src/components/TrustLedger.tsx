import { Shield, AlertOctagon } from 'lucide-react';

interface TrustLedgerProps {
  mode: 'AC' | 'DC';
}

export default function TrustLedger({ mode }: TrustLedgerProps) {
  const blocks = mode === 'AC' ? [
    { hash: '0x7f4a...3c9d', timestamp: '14:32:18', zone: 'North-A', consumption: 847.3, verified: true, anomaly: false },
    { hash: '0x9b2e...7d1f', timestamp: '14:32:15', zone: 'East-C', consumption: 1243.7, verified: true, anomaly: true },
    { hash: '0x4c8a...9e2b', timestamp: '14:32:12', zone: 'West-B', consumption: 692.1, verified: true, anomaly: false },
    { hash: '0x1d5f...4a7c', timestamp: '14:32:09', zone: 'South-D', consumption: 1089.4, verified: true, anomaly: false },
    { hash: '0x6e3b...8f5d', timestamp: '14:32:06', zone: 'Central', consumption: 2147.9, verified: true, anomaly: true },
  ] : [
    { hash: '0x8a5c...2b4e', timestamp: '14:32:18', zone: 'North-A', consumption: 812.5, verified: true, anomaly: false },
    { hash: '0x3f7d...9c1a', timestamp: '14:32:15', zone: 'East-C', consumption: 1198.2, verified: true, anomaly: false },
    { hash: '0x5b9e...6d3f', timestamp: '14:32:12', zone: 'West-B', consumption: 671.8, verified: true, anomaly: false },
    { hash: '0x2c4a...7e8b', timestamp: '14:32:09', zone: 'South-D', consumption: 1057.3, verified: true, anomaly: false },
    { hash: '0x9d1f...4c5a', timestamp: '14:32:06', zone: 'Central', consumption: 2089.6, verified: true, anomaly: false },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-xl p-6 border border-cyan-900/30 backdrop-blur-sm">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="w-5 h-5 text-cyan-400" />
        <h2 className="text-xl font-bold text-cyan-400 tracking-wide">TRUST LEDGER</h2>
      </div>

      <div className="space-y-2 mb-4">
        {blocks.map((block, idx) => (
          <div
            key={idx}
            className={`bg-gray-950/50 rounded-lg p-3 border transition-all hover:scale-[1.02] ${
              block.anomaly
                ? 'border-red-900/50 bg-red-950/10'
                : 'border-gray-800 hover:border-cyan-900/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${block.anomaly ? 'bg-red-500 animate-pulse' : 'bg-green-500'} shadow-lg ${block.anomaly ? 'shadow-red-500/50' : 'shadow-green-500/50'}`} />
                <span className="text-xs font-mono text-gray-400">{block.hash}</span>
              </div>
              <span className="text-xs text-gray-500 font-mono">{block.timestamp}</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="text-xs text-gray-500">ZONE</div>
                <div className="text-sm font-bold text-cyan-400">{block.zone}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">CONSUMPTION</div>
                <div className="text-sm font-bold text-gray-300 font-mono">{block.consumption} kWh</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">STATUS</div>
                <div className={`text-xs font-bold ${block.anomaly ? 'text-red-400' : 'text-green-400'}`}>
                  {block.anomaly ? '⚠ FLAGGED' : '✓ VERIFIED'}
                </div>
              </div>
            </div>

            {block.anomaly && (
              <div className="mt-2 flex items-center space-x-2 bg-red-950/30 rounded px-2 py-1.5 border border-red-900/50">
                <AlertOctagon className="w-3 h-3 text-red-400" />
                <span className="text-xs text-red-400 font-bold">THEFT PATTERN DETECTED · 23% DEVIATION</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-green-950/30 to-green-900/30 rounded-lg p-3 border border-green-900/50">
          <div className="text-xs text-gray-400 mb-1">VERIFIED BLOCKS</div>
          <div className="text-2xl font-bold text-green-400 font-mono">{blocks.filter(b => !b.anomaly).length}</div>
        </div>
        <div className="bg-gradient-to-br from-red-950/30 to-red-900/30 rounded-lg p-3 border border-red-900/50">
          <div className="text-xs text-gray-400 mb-1">ANOMALIES</div>
          <div className="text-2xl font-bold text-red-400 font-mono">{blocks.filter(b => b.anomaly).length}</div>
        </div>
      </div>

      <div className="mt-4 bg-gradient-to-r from-cyan-950/30 to-cyan-900/30 rounded-lg p-3 border border-cyan-900/50">
        <div className="text-xs text-gray-400 mb-1">BLOCKCHAIN INTEGRITY</div>
        <div className="text-sm text-cyan-400 font-mono">
          {mode === 'AC'
            ? 'Chain Height: 487,392 · Last Hash: 0x3f9a...7c2d'
            : 'Chain Height: 487,392 · Last Hash: 0x8d4b...5e1c'
          }
        </div>
      </div>
    </div>
  );
}
