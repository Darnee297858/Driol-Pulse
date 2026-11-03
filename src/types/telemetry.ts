export interface NodeMetric {
  id: string;
  name: string;
  location: string;
  status: 'ONLINE' | 'WARNING' | 'CRITICAL' | 'OFFLINE';
  temperature: number; // Celsius
  cpuLoad: number; // %
  voltage: number; // Volts
  powerOutput: number; // kW
  latency: number; // ms
  lastUpdate: string;
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  nodeId: string;
  type: 'INFO' | 'PREDICTION' | 'ALERT' | 'OVERRIDE';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}
