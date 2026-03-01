import { useState } from 'react';
import Header from './components/Header';
import NationalHeatmap from './components/NationalHeatmap';
import DigitalLossTwin from './components/DigitalLossTwin';
import TrustLedger from './components/TrustLedger';
import ProsumerPortal from './components/ProsumerPortal';
import LossDecomposition from './components/LossDecomposition';
import ModeToggle from './components/ModeToggle';

function App() {
  const [mode, setMode] = useState<'AC' | 'DC'>('AC');

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-slate-900 to-gray-950 text-gray-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative">
        <Header mode={mode} />

        <div className="container mx-auto px-6 py-6 space-y-6">
          <ModeToggle mode={mode} onToggle={setMode} />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <NationalHeatmap mode={mode} />
            </div>
            <div>
              <LossDecomposition mode={mode} />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <DigitalLossTwin mode={mode} />
            <TrustLedger mode={mode} />
          </div>

          <ProsumerPortal mode={mode} />
        </div>
      </div>
    </div>
  );
}

export default App;
