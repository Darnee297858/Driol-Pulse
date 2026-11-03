'use client';
import React, { useState } from 'react';
import { Sliders, Zap, RefreshCcw } from 'lucide-react';

interface WhatIfSimulatorProps {
  onSimulate: (thermalBias: number, voltageBoost: number) => void;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({ onSimulate }) => {
  const [thermalBias, setThermalBias] = useState<number>(0);
  const [voltageBoost, setVoltageBoost] = useState<number>(100);

  const handleApply = () => {
    onSimulate(thermalBias, voltageBoost);
  };

  const handleReset = () => {
    setThermalBias(0);
    setVoltageBoost(100);
    onSimulate(0, 100);
  };

  return (
    <div className="glass-panel p-5 rounded-xl border border-surface-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
          <Sliders className="w-4 h-4 text-brand-purple" />
          INTERACTIVE "WHAT-IF" HARDWARE SANDBOX
        </h3>
        <button onClick={handleReset} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-mono">
          <RefreshCcw className="w-3 h-3" /> Reset Defaults
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Slider 1 */}
        <div>
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-gray-300">Ambient Temperature Shift</span>
            <span className="text-brand-cyan font-bold">{thermalBias > 0 ? `+${thermalBias}` : thermalBias}°C</span>
          </div>
          <input
            type="range"
            min="-20"
            max="40"
            value={thermalBias}
            onChange={(e) => {
              setThermalBias(Number(e.target.value));
              onSimulate(Number(e.target.value), voltageBoost);
            }}
            className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-brand-cyan"
          />
        </div>

        {/* Slider 2 */}
        <div>
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-gray-300">Target Voltage Load</span>
            <span className="text-brand-purple font-bold">{voltageBoost}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="150"
            value={voltageBoost}
            onChange={(e) => {
              setVoltageBoost(Number(e.target.value));
              onSimulate(thermalBias, Number(e.target.value));
            }}
            className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-brand-purple"
          />
        </div>
      </div>
    </div>
  );
};
