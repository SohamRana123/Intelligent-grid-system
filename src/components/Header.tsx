import { Zap, Activity } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  mode: "AC" | "DC";
}

export default function Header({ mode }: HeaderProps) {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", { hour12: false }),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  const acStats = {
    efficiency: 87.3,
    losses: 12.7,
    activeNodes: 45892,
  };

  const dcStats = {
    efficiency: 94.6,
    losses: 5.4,
    activeNodes: 45892,
  };

  const stats = mode === "AC" ? acStats : dcStats;

  return (
    <header className="border-b border-cyan-900/30 bg-gray-950/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 blur-xl opacity-30" />
              <Zap className="w-10 h-10 text-green-400 relative" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-green-400 to-cyan-400">
                Reducing Transmission Losses to &lt;2% by 2030
              </h1>
              <p className="text-sm text-gray-400 tracking-wide">
                ENERGY INTELLIGENCE PLATFORM · NATIONAL GRID COMMAND
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <Activity className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-gray-400">LIVE</span>
            <span className="text-green-400 font-mono">{time}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
