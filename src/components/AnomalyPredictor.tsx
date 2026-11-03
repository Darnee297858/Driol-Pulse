'use client';
import React from 'react';
import { AlertTriangle, Cpu, Thermometer, ShieldAlert } from 'lucide-react';

export const AnomalyPredictor: React.FC = () => {
  const anomalies = [
    {
      id: 'ANM-409',
      node: 'Hardware Node #409 (Solar Array B)',
      prediction: 'Thermal Throttling forecasted in ~14 mins due to high voltage curve.',
      confidence: '94.8%',
      severity: 'CRITICAL',
      icon: Thermometer,
      color: 'border-brand-rose/40 text-brand-rose bg-brand-rose/10',
    },
    {
      id: 'ANM-102',
      node: 'Node #102 (Cooling Pump Alpha)',
      prediction: 'RPM trajectory deviating from nominal curve. Maintenance advised.',
      confidence: '87.2%',
      severity: 'WARNING',
      icon: Cpu,
      color: 'border-brand-amber/40 text-brand-amber bg-brand-amber/10',
    },
  ];

  return (
    <div className="glass-panel p-5 rounded-xl border border-surface-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-brand-rose" />
          PREDICTIVE ANOMALY DETECTION ENGINE
        </h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-rose/10 text-brand-rose border border-brand-rose/20">
          AI AGENT ACTIVE
        </span>
      </div>

      <div className="space-y-3">
        {anomalies.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className={`p-3.5 rounded-lg border ${item.color} flex items-start gap-3`}>
              <Icon className="w-5 h-5 mt-0.5 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold font-mono text-white">{item.node}</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/40">
                    Confidence: {item.confidence}
                  </span>
                </div>
                <p className="text-xs text-gray-300 font-sans">{item.prediction}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
