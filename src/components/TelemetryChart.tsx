'use client';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartDataPoint {
  time: string;
  temperature: number;
  cpuLoad: number;
  powerOutput: number;
}

interface TelemetryChartProps {
  data: ChartDataPoint[];
}

export const TelemetryChart: React.FC<TelemetryChartProps> = ({ data }) => {
  return (
    <div className="glass-panel p-5 rounded-xl border border-surface-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
            HIGH-FREQUENCY POWER & THERMAL METRICS
          </h3>
          <p className="text-xs text-gray-400">Sub-second telemetry data buffer over WebSocket stream</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-brand-cyan">
            <span className="w-2.5 h-2.5 rounded-sm bg-brand-cyan/20 border border-brand-cyan"></span> Temp (°C)
          </span>
          <span className="flex items-center gap-1.5 text-brand-purple">
            <span className="w-2.5 h-2.5 rounded-sm bg-brand-purple/20 border border-brand-purple"></span> CPU (%)
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00F2FE" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#00F2FE" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7928CA" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#7928CA" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#4B5563" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
            <YAxis stroke="#4B5563" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#12141D',
                borderColor: '#1E2230',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#fff',
                fontFamily: 'monospace'
              }}
            />
            <Area type="monotone" dataKey="temperature" stroke="#00F2FE" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={2} />
            <Area type="monotone" dataKey="cpuLoad" stroke="#7928CA" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
