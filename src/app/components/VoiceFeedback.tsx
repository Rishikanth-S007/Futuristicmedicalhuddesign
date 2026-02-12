import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mic } from 'lucide-react';

const voiceCommands = [
  'Nova, isolate the left ventricle.',
  'Nova, rotate 90 degrees clockwise.',
  'Nova, zoom to mitral valve.',
  'Nova, capture current view.',
  'Nova, show blood flow overlay.',
  'Nova, measure aortic diameter.',
];

export function VoiceFeedback() {
  const [isActive, setIsActive] = useState(false);
  const [command, setCommand] = useState(voiceCommands[0]);
  const [waveformData, setWaveformData] = useState<number[]>(
    Array(40).fill(0.5)
  );

  useEffect(() => {
    // Simulate voice activity
    const activityInterval = setInterval(() => {
      setIsActive((prev) => !prev);
    }, 4000);

    return () => clearInterval(activityInterval);
  }, []);

  useEffect(() => {
    // Update command text
    let commandIndex = 0;
    const commandInterval = setInterval(() => {
      commandIndex = (commandIndex + 1) % voiceCommands.length;
      setCommand(voiceCommands[commandIndex]);
    }, 6000);

    return () => clearInterval(commandInterval);
  }, []);

  useEffect(() => {
    // Animate waveform
    const waveInterval = setInterval(() => {
      setWaveformData((prev) => {
        const newData = [...prev.slice(1)];
        if (isActive) {
          newData.push(0.3 + Math.random() * 0.7);
        } else {
          newData.push(0.5 + Math.random() * 0.1);
        }
        return newData;
      });
    }, 50);

    return () => clearInterval(waveInterval);
  }, [isActive]);

  return (
    <div
      className="rounded-lg p-4 backdrop-blur-xl"
      style={{
        background: 'rgba(15, 25, 35, 0.7)',
        border: `1px solid ${isActive ? 'rgba(173, 255, 0, 0.4)' : 'rgba(0, 242, 255, 0.2)'}`,
        boxShadow: `inset 0 1px 3px rgba(255, 255, 255, 0.1), 0 4px 20px rgba(0, 0, 0, 0.3)`,
        width: '420px',
        height: '180px',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          animate={
            isActive
              ? { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }
              : { scale: 1, opacity: 0.5 }
          }
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Mic
            size={18}
            style={{ color: isActive ? '#ADFF00' : '#00F2FF' }}
          />
        </motion.div>
        <span className="text-sm font-mono" style={{ color: '#00F2FF' }}>
          VOICE COMMAND
        </span>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-auto"
          >
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{
                background: 'rgba(173, 255, 0, 0.2)',
                color: '#ADFF00',
              }}
            >
              LISTENING
            </span>
          </motion.div>
        )}
      </div>

      {/* Waveform */}
      <div className="mb-3" style={{ height: '60px' }}>
        <svg width="100%" height="100%" className="overflow-visible">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                style={{
                  stopColor: isActive ? '#ADFF00' : '#00F2FF',
                  stopOpacity: 0.8,
                }}
              />
              <stop
                offset="100%"
                style={{
                  stopColor: isActive ? '#ADFF00' : '#00F2FF',
                  stopOpacity: 0.2,
                }}
              />
            </linearGradient>
          </defs>

          {/* Center line */}
          <line
            x1="0"
            y1="30"
            x2="100%"
            y2="30"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />

          {/* Waveform bars */}
          {waveformData.map((value, index) => {
            const x = (index / waveformData.length) * 100;
            const height = value * 50;
            return (
              <motion.rect
                key={index}
                x={`${x}%`}
                y={30 - height / 2}
                width="2%"
                height={height}
                fill="url(#waveGradient)"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.1 }}
              />
            );
          })}
        </svg>
      </div>

      {/* Command Text */}
      <motion.div
        key={command}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-sm font-mono italic"
        style={{ color: '#ccc' }}
      >
        "{command}"
      </motion.div>
    </div>
  );
}