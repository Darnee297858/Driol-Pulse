'use client';
import React from 'react';
import { Activity, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

interface HeaderProps {
  clusterLoad: number;
  activeNodesCount: number;
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({ clusterLoad, activeNodesCount, onRefresh }) => {
  return (
    <header className="glass-panel border-b border-surface-border px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-6">
        <div>
          <h2 className="text-lg font-bold text-white tracking-wide font-sans">Autonomous Edge Telemetry Suite</h2>
          <p className="text-xs text-gray-400 font-mono">Live WebSocket Feed • Micro-Grid Hardware Stream</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Metric 1 */}
        <div className="px-3 py-1.5 rounded-md bg-surface border border-surface-border flex items-center gap-3">
          <Zap className="w-4 h-4 text-brand-amber" />
          <div>
            <div className="text-[10px] font-mono text-gray-400 uppercase">Cluster Load</div>
            <div className="text-xs font-mono font-bold text-white">{clusterLoad.toFixed(1)}%</div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="px-3 py-1.5 rounded-md bg-surface border border-surface-border flex items-center gap-3">
          <Activity className="w-4 h-4 text-brand-cyan" />
          <div>
            <div className="text-[10px] font-mono text-gray-400 uppercase">Active Nodes</div>
            <div className="text-xs font-mono font-bold text-white">{activeNodesCount} / 1,420</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="px-3 py-1.5 rounded-md bg-surface border border-surface-border flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 text-brand-emerald" />
          <div>
            <div className="text-[10px] font-mono text-gray-400 uppercase">Secured Latency</div>
            <div className="text-xs font-mono font-bold text-brand-emerald">12ms</div>
          </div>
        </div>

        {/* Manual Force Sync */}
        <button
          onClick={onRefresh}
          className="p-2 rounded-md bg-surface hover:bg-surface-border text-gray-300 hover:text-white border border-surface-border transition-colors"
          title="Force Telemetry Sync"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
