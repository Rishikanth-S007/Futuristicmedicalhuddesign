import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal } from 'lucide-react';

interface LogEntry {
  id: number;
  type: 'STREAMING' | 'TRIGGER' | 'SYSTEM';
  message: string;
  timestamp: string;
}

const mockActions = [
  { type: 'STREAMING' as const, message: 'ACTION_ROTATE_LEFT' },
  { type: 'TRIGGER' as const, message: 'ACTION_CAPTURE' },
  { type: 'SYSTEM' as const, message: 'SCREENSHOT SAVED TO /captures/' },
  { type: 'STREAMING' as const, message: 'ACTION_ZOOM_IN' },
  { type: 'TRIGGER' as const, message: 'ACTION_ISOLATE_VENTRICLE' },
  { type: 'SYSTEM' as const, message: 'LAYER ISOLATED: LEFT_VENTRICLE' },
  { type: 'STREAMING' as const, message: 'ACTION_ROTATE_RIGHT' },
  { type: 'TRIGGER' as const, message: 'ACTION_MEASURE' },
  { type: 'SYSTEM' as const, message: 'MEASUREMENT: 45.2mm' },
];

export function ActionLog() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      const action = mockActions[counter % mockActions.length];
      const now = new Date();
      const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      setLogs((prev) => {
        const newLogs = [
          {
            id: Date.now(),
            type: action.type,
            message: action.message,
            timestamp,
          },
          ...prev,
        ].slice(0, 8); // Keep only last 8 entries
        return newLogs;
      });

      counter++;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getTypeColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'STREAMING':
        return '#00F2FF';
      case 'TRIGGER':
        return '#ADFF00';
      case 'SYSTEM':
        return '#888';
      default:
        return '#fff';
    }
  };

  return (
    <div
      className="rounded-lg p-4 backdrop-blur-xl"
      style={{
        background: 'rgba(15, 25, 35, 0.7)',
        border: '1px solid rgba(0, 242, 255, 0.2)',
        boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.1), 0 4px 20px rgba(0, 0, 0, 0.3)',
        width: '380px',
        height: '280px',
      }}
    >
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-cyan-500/20">
        <Terminal size={18} style={{ color: '#00F2FF' }} />
        <span className="text-sm font-mono" style={{ color: '#00F2FF' }}>
          ACTION LOG
        </span>
      </div>

      <div className="space-y-1 overflow-hidden" style={{ height: '220px' }}>
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-xs leading-relaxed"
            >
              <span style={{ color: '#666' }}>[{log.timestamp}]</span>{' '}
              <span style={{ color: getTypeColor(log.type) }}>
                [{log.type}]
              </span>
              :{' '}
              <span style={{ color: '#ccc' }}>{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}