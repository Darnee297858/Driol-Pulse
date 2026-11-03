'use client';
import React from 'react';
import { Activity, Cpu, ShieldAlert, Sliders, Server, Zap, Radio } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'telemetry', label: 'Live Telemetry', icon: Activity },
    { id: 'nodes', label: 'Fleet Matrix (1,420)', icon: Server },
    { id: 'anomaly', label: 'AI Anomaly Predictor', icon: ShieldAlert },
    { id: 'sandbox', label: 'What-If Simulator', icon: Sliders },
  ];

  return (
    <aside className="w-64 glass-panel flex flex-col justify-between p-4 h-screen sticky top-0 border-r border-surface-border z-30">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-surface-border">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center font-bold text-black font-mono shadow-lg shadow-brand-cyan/20">
            DP
          </div>
          <div>
            <h1 className="font-mono font-bold tracking-wider text-sm bg-gradient-to-r from-white via-gray-200 to-brand-cyan bg-clip-text text-transparent">
              DRIOL // PULSE
            </h1>
            <p className="text-[10px] font-mono text-gray-400 tracking-tight">v2.4 TELEMETRY ENGINE</p>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="px-3 py-2 mb-6 rounded-md bg-surface border border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
            <span className="text-xs font-mono text-gray-300">Cluster Status</span>
          </div>
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20">
            99.98%
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-surface'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-cyan' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Operator Footer */}
      <div className="p-3 rounded-lg bg-surface/50 border border-surface-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-emerald animate-ping" />
          <span className="text-[11px] font-mono text-gray-300">Operator: <strong className="text-white">DRIOL</strong></span>
        </div>
        <p className="text-[10px] text-gray-500 font-mono mt-1">Region: EU-Central (Frankfurt)</p>
      </div>
    </aside>
  );
};
