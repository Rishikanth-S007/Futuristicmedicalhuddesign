import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Heart, Droplet, Wind } from 'lucide-react';

interface Vital {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  normalRange: [number, number];
  criticalRange: [number, number];
  color: string;
}

export function PatientVitals() {
  const [vitals, setVitals] = useState<Vital[]>([
    {
      id: 'hr',
      label: 'HEART RATE',
      value: 72,
      unit: 'BPM',
      icon: <Heart size={20} />,
      normalRange: [60, 100],
      criticalRange: [50, 110],
      color: '#00F2FF',
    },
    {
      id: 'o2',
      label: 'OXYGEN',
      value: 98,
      unit: '%',
      icon: <Wind size={20} />,
      normalRange: [95, 100],
      criticalRange: [90, 105],
      color: '#00F2FF',
    },
    {
      id: 'bp',
      label: 'BLOOD PRESSURE',
      value: 120,
      unit: '/80',
      icon: <Activity size={20} />,
      normalRange: [90, 140],
      criticalRange: [80, 150],
      color: '#00F2FF',
    },
    {
      id: 'temp',
      label: 'TEMPERATURE',
      value: 36.8,
      unit: '°C',
      icon: <Droplet size={20} />,
      normalRange: [36.5, 37.5],
      criticalRange: [35.5, 38.5],
      color: '#00F2FF',
    },
  ]);

  const [ecgData, setEcgData] = useState<number[]>(
    Array(60)
      .fill(0)
      .map(() => Math.random() * 0.3)
  );

  useEffect(() => {
    // Simulate vital signs updates with occasional critical values
    const vitalInterval = setInterval(() => {
      setVitals((prev) =>
        prev.map((vital) => {
          let newValue = vital.value;
          const variance = vital.id === 'temp' ? 0.2 : 3;
          
          // Occasionally spike to critical levels (20% chance)
          if (Math.random() > 0.8) {
            if (Math.random() > 0.5) {
              // Spike high
              if (vital.id === 'hr') newValue = 105 + Math.random() * 5;
              if (vital.id === 'bp') newValue = 145 + Math.random() * 10;
              if (vital.id === 'o2') newValue = 92 + Math.random() * 2;
              if (vital.id === 'temp') newValue = 37.8 + Math.random() * 0.4;
            } else {
              // Spike low  
              if (vital.id === 'hr') newValue = 55 + Math.random() * 5;
              if (vital.id === 'bp') newValue = 85 + Math.random() * 5;
              if (vital.id === 'o2') newValue = 91 + Math.random() * 2;
              if (vital.id === 'temp') newValue = 36.0 + Math.random() * 0.3;
            }
          } else {
            // Normal variation
            newValue += (Math.random() - 0.5) * variance;

            // Keep in normal-ish ranges
            if (vital.id === 'hr') newValue = Math.max(65, Math.min(95, newValue));
            if (vital.id === 'o2') newValue = Math.max(94, Math.min(100, newValue));
            if (vital.id === 'bp') newValue = Math.max(105, Math.min(135, newValue));
            if (vital.id === 'temp') newValue = Math.max(36.4, Math.min(37.3, newValue));
          }

          return { ...vital, value: newValue };
        })
      );
    }, 3000);

    return () => clearInterval(vitalInterval);
  }, []);

  useEffect(() => {
    // Simulate ECG waveform
    const ecgInterval = setInterval(() => {
      setEcgData((prev) => {
        const newData = [...prev.slice(1)];
        const random = Math.random();

        // Create ECG-like pattern
        if (random > 0.9) {
          // QRS complex spike
          newData.push(0.9);
        } else if (random > 0.85) {
          // P wave
          newData.push(0.4);
        } else {
          // Baseline
          newData.push(0.1 + Math.random() * 0.1);
        }

        return newData;
      });
    }, 50);

    return () => clearInterval(ecgInterval);
  }, []);

  const isInNormalRange = (vital: Vital) => {
    return vital.value >= vital.normalRange[0] && vital.value <= vital.normalRange[1];
  };

  const isInCriticalRange = (vital: Vital) => {
    return (
      vital.value < vital.criticalRange[0] || vital.value > vital.criticalRange[1]
    );
  };

  const getAlertLevel = (vital: Vital): 'normal' | 'warning' | 'critical' => {
    if (isInNormalRange(vital)) return 'normal';
    if (isInCriticalRange(vital)) return 'critical';
    return 'warning';
  };

  const getAlertColor = (level: 'normal' | 'warning' | 'critical') => {
    switch (level) {
      case 'critical':
        return { border: '#FF3B30', text: '#FF3B30', bg: 'rgba(255, 59, 48, 0.2)' };
      case 'warning':
        return { border: '#FFB800', text: '#FFB800', bg: 'rgba(255, 184, 0, 0.2)' };
      default:
        return { border: '#00F2FF', text: '#00F2FF', bg: 'rgba(0, 242, 255, 0.2)' };
    }
  };

  return (
    <div className="space-y-3">
      {/* ECG Monitor */}
      <div
        className="rounded-lg p-4 backdrop-blur-xl"
        style={{
          background: 'rgba(15, 25, 35, 0.7)',
          border: '1px solid rgba(0, 242, 255, 0.2)',
          boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.1), 0 4px 20px rgba(0, 0, 0, 0.3)',
          width: '280px',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Activity size={16} style={{ color: '#00F2FF' }} />
          <span className="text-xs font-mono" style={{ color: '#00F2FF' }}>
            ECG MONITOR
          </span>
          <motion.div
            className="ml-auto w-2 h-2 rounded-full"
            style={{ background: '#ADFF00' }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

        <svg width="100%" height="80" className="overflow-visible">
          <defs>
            <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#00F2FF', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#00F2FF', stopOpacity: 0.2 }} />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <g stroke="rgba(0, 242, 255, 0.1)" strokeWidth="0.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 10} x2="100%" y2={i * 10} />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`v${i}`} x1={`${(i / 12) * 100}%`} y1="0" x2={`${(i / 12) * 100}%`} y2="80" />
            ))}
          </g>

          {/* ECG waveform */}
          <polyline
            fill="none"
            stroke="url(#ecgGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={ecgData
              .map((value, index) => {
                const x = (index / ecgData.length) * 100;
                const y = 70 - value * 60;
                return `${x}%,${y}`;
              })
              .join(' ')}
          />
        </svg>
      </div>

      {/* Vital Signs Cards */}
      {vitals.map((vital, index) => {
        const alertLevel = getAlertLevel(vital);
        const alertColors = getAlertColor(alertLevel);
        
        return (
        <motion.div
          key={vital.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-lg p-3 backdrop-blur-xl"
          style={{
            background: 'rgba(15, 25, 35, 0.7)',
            border: `2px solid ${alertColors.border}${alertLevel === 'normal' ? '33' : alertLevel === 'warning' ? '80' : 'CC'}`,
            boxShadow: alertLevel !== 'normal' 
              ? `0 0 20px ${alertColors.border}40, inset 0 2px 4px rgba(255, 255, 255, 0.1)` 
              : 'inset 0 1px 2px rgba(255, 255, 255, 0.05)',
            width: '280px',
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <motion.div 
                style={{ color: alertLevel === 'normal' ? vital.color : alertColors.text }}
                animate={alertLevel === 'critical' ? { 
                  filter: [
                    `drop-shadow(0 0 5px ${alertColors.text})`,
                    `drop-shadow(0 0 15px ${alertColors.text})`,
                    `drop-shadow(0 0 5px ${alertColors.text})`,
                  ]
                } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                {vital.icon}
              </motion.div>
              <div>
                <div
                  className="text-xs font-mono"
                  style={{ color: '#888' }}
                >
                  {vital.label}
                </div>
                <motion.div
                  key={vital.value}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-mono font-semibold"
                  style={{
                    color: alertLevel === 'normal' ? '#00F2FF' : alertColors.text,
                    textShadow: alertLevel !== 'normal' ? `0 0 10px ${alertColors.text}60` : 'none',
                  }}
                >
                  {vital.id === 'temp'
                    ? vital.value.toFixed(1)
                    : Math.round(vital.value)}
                  <span className="text-sm ml-1" style={{ color: '#888' }}>
                    {vital.unit}
                  </span>
                </motion.div>
              </div>
            </div>

            {alertLevel !== 'normal' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="px-2 py-0.5 rounded text-xs font-mono font-bold"
                style={{
                  background: alertColors.bg,
                  color: alertColors.text,
                  boxShadow: `0 0 10px ${alertColors.text}40`,
                }}
              >
                {alertLevel === 'critical' ? 'CRITICAL' : 'WARNING'}
              </motion.div>
            )}
          </div>

          {/* Mini trend indicator */}
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '3px',
                  height: `${5 + Math.random() * 10}px`,
                  background: alertLevel === 'normal'
                    ? 'rgba(0, 242, 255, 0.3)'
                    : `${alertColors.text}50`,
                }}
              />
            ))}
          </div>
        </motion.div>
      )})}
    </div>
  );
}