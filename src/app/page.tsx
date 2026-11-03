'use client';
import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { TelemetryChart } from '@/components/TelemetryChart';
import { AnomalyPredictor } from '@/components/AnomalyPredictor';
import { WhatIfSimulator } from '@/components/WhatIfSimulator';
import { NodeMetric } from '@/types/telemetry';
import { Cpu, Thermometer, Zap, Activity } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('telemetry');
  const [chartData, setChartData] = useState<any[]>([]);
  const [simulatedBias, setSimulatedBias] = useState<{ temp: number; voltage: number }>({ temp: 0, voltage: 100 });

  // Mock nodes initial state
  const [nodes, setNodes] = useState<NodeMetric[]>([
    { id: 'NODE-01', name: 'Grid Telemetry Node A', location: 'Section 4', status: 'ONLINE', temperature: 42, cpuLoad: 38, voltage: 230, powerOutput: 14.2, latency: 11, lastUpdate: 'Just now' },
    { id: 'NODE-02', name: 'Solar Array Inverter 04', location: 'Section 1', status: 'ONLINE', temperature: 48, cpuLoad: 62, voltage: 240, powerOutput: 18.9, latency: 14, lastUpdate: 'Just now' },
    { id: 'NODE-03', name: 'Cooling Pump Alpha', location: 'Section 8', status: 'WARNING', temperature: 68, cpuLoad: 89, voltage: 220, powerOutput: 9.4, latency: 19, lastUpdate: 'Just now' },
    { id: 'NODE-04', name: 'Battery Storage Unit C', location: 'Section 2', status: 'ONLINE', temperature: 36, cpuLoad: 24, voltage: 235, powerOutput: 22.1, latency: 9, lastUpdate: 'Just now' },
  ]);

  // High-Frequency Real-Time Telemetry Data Generator Loop
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];

      // Base simulated telemetry values
      const baseTemp = Math.floor(40 + Math.random() * 15) + simulatedBias.temp;
      const baseCpu = Math.min(100, Math.floor((35 + Math.random() * 40) * (simulatedBias.voltage / 100)));

      setChartData((prev) => {
        const nextBuffer = [...prev, { time: timeStr, temperature: baseTemp, cpuLoad: baseCpu, powerOutput: 15 + Math.random() * 5 }];
        if (nextBuffer.length > 20) nextBuffer.shift();
        return nextBuffer;
      });

      // Fluctuate individual nodes slightly
      setNodes((prevNodes) =>
        prevNodes.map((n) => ({
          ...n,
          temperature: Math.max(20, Math.floor(n.temperature + (Math.random() * 4 - 2) + (simulatedBias.temp * 0.1))),
          cpuLoad: Math.min(100, Math.max(10, Math.floor(n.cpuLoad + (Math.random() * 6 - 3)))),
        }))
      );
    }, 1200);

    return () => clearInterval(interval);
  }, [simulatedBias]);

  const handleSimulate = (thermalBias: number, voltageBoost: number) => {
    setSimulatedBias({ temp: thermalBias, voltage: voltageBoost });
  };

  const activeNodesCount = nodes.filter(n => n.status !== 'OFFLINE').length;
  const avgCpuLoad = nodes.reduce((acc, curr) => acc + curr.cpuLoad, 0) / nodes.length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          clusterLoad={avgCpuLoad}
          activeNodesCount={activeNodesCount}
          onRefresh={() => {}}
        />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Top Live Node Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nodes.map((node) => (
              <div key={node.id} className="glass-panel p-4 rounded-xl border border-surface-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-gray-400">{node.id}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    node.status === 'ONLINE' ? 'bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20' : 'bg-brand-amber/10 text-brand-amber border border-brand-amber/20'
                  }`}>
                    {node.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mb-3 truncate">{node.name}</h4>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-gray-300">
                    <Thermometer className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>{node.temperature}°C</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-300">
                    <Cpu className="w-3.5 h-3.5 text-brand-purple" />
                    <span>{node.cpuLoad}% Load</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Visualizer Chart */}
          <TelemetryChart data={chartData} />

          {/* Bottom Grid: AI Predictor & What-If Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnomalyPredictor />
            <WhatIfSimulator onSimulate={handleSimulate} />
          </div>
        </main>
      </div>
    </div>
  );
}
