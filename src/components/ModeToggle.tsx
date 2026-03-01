interface ModeToggleProps {
  mode: 'AC' | 'DC';
  onToggle: (mode: 'AC' | 'DC') => void;
}

export default function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  return (
    <div className="flex items-center justify-center space-x-6 bg-linear-to-r from-gray-900/80 via-slate-900/80 to-gray-900/80 rounded-xl p-6 border border-cyan-900/30 backdrop-blur-sm">
      <span className={`text-sm font-bold tracking-wider transition-all ${mode === 'AC' ? 'text-cyan-400 scale-110' : 'text-gray-600'}`}>
        AC MODE
      </span>

      <button
        onClick={() => onToggle(mode === 'AC' ? 'DC' : 'AC')}
        className="relative w-24 h-12 bg-gray-800 rounded-full border-2 border-cyan-900/50 transition-all duration-300 hover:border-cyan-500/50 group"
      >
        <div className={`absolute top-1 ${mode === 'AC' ? 'left-1' : 'left-[50%]'} w-10 h-8 bg-linear-to-r ${mode === 'AC' ? 'from-cyan-500 to-cyan-600' : 'from-green-500 to-green-600'} rounded-full transition-all duration-300 shadow-lg ${mode === 'AC' ? 'shadow-cyan-500/50' : 'shadow-green-500/50'}`}>
          <div className="absolute inset-0 rounded-full bg-white/20" />
        </div>

        <div className={`absolute inset-0 rounded-full ${mode === 'AC' ? 'bg-cyan-500/10' : 'bg-green-500/10'} blur-md transition-all duration-300`} />
      </button>

      <span className={`text-sm font-bold tracking-wider transition-all ${mode === 'DC' ? 'text-green-400 scale-110' : 'text-gray-600'}`}>
        DC MODE
      </span>
    </div>
  );
}
