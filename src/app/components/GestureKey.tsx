import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Hand, ZoomIn, Maximize2, RotateCw } from 'lucide-react';

interface Gesture {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const gestures: Gesture[] = [
  {
    id: 'pinch',
    name: 'PINCH',
    icon: <ZoomIn size={24} />,
    description: 'Zoom In/Out',
  },
  {
    id: 'palm',
    name: 'PALM OPEN',
    icon: <Hand size={24} />,
    description: 'Pan View',
  },
  {
    id: 'pinky',
    name: 'PINKY UP',
    icon: <Maximize2 size={24} />,
    description: 'Capture Frame',
  },
  {
    id: 'rotate',
    name: 'ROTATE',
    icon: <RotateCw size={24} />,
    description: 'Rotate Model',
  },
];

export function GestureKey() {
  const [activeGesture, setActiveGesture] = useState<string | null>(null);

  useEffect(() => {
    // Simulate gesture detection
    const interval = setInterval(() => {
      const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
      setActiveGesture(randomGesture.id);

      setTimeout(() => {
        setActiveGesture(null);
      }, 1500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="rounded-lg p-4 backdrop-blur-xl"
      style={{
        background: 'rgba(15, 25, 35, 0.7)',
        border: '1px solid rgba(0, 242, 255, 0.2)',
        boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.1), 0 4px 20px rgba(0, 0, 0, 0.3)',
        width: '220px',
      }}
    >
      <div className="mb-3 pb-2 border-b border-cyan-500/20">
        <span className="text-sm font-mono" style={{ color: '#00F2FF' }}>
          GESTURE KEY
        </span>
      </div>

      <div className="space-y-3">
        {gestures.map((gesture) => {
          const isActive = activeGesture === gesture.id;

          return (
            <motion.div
              key={gesture.id}
              className="flex items-center gap-3 p-2 rounded transition-all"
              style={{
                background: isActive
                  ? 'rgba(173, 255, 0, 0.25)'
                  : 'transparent',
                border: isActive
                  ? '2px solid rgba(173, 255, 0, 0.8)'
                  : '1px solid transparent',
                boxShadow: isActive
                  ? '0 0 20px rgba(173, 255, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.1)'
                  : 'none',
              }}
              animate={
                isActive
                  ? { scale: [1, 1.08, 1.05] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex-shrink-0"
                style={{
                  color: isActive ? '#ADFF00' : '#00F2FF',
                }}
                animate={
                  isActive
                    ? {
                        filter: [
                          'drop-shadow(0 0 8px #ADFF00)',
                          'drop-shadow(0 0 20px #ADFF00)',
                          'drop-shadow(0 0 8px #ADFF00)',
                        ],
                      }
                    : {}
                }
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {gesture.icon}
              </motion.div>

              <div className="flex-1 min-w-0">
                <div
                  className="text-xs font-mono font-semibold"
                  style={{
                    color: isActive ? '#ADFF00' : '#00F2FF',
                    textShadow: isActive ? '0 0 10px rgba(173, 255, 0, 0.6)' : 'none',
                  }}
                >
                  {gesture.name}
                </div>
                <div
                  className="text-xs font-mono"
                  style={{ color: isActive ? '#ADFF00' : '#888' }}
                >
                  {gesture.description}
                </div>
              </div>

              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="flex-shrink-0 rounded-full"
                  style={{
                    width: '10px',
                    height: '10px',
                    background: '#ADFF00',
                    boxShadow: '0 0 15px #ADFF00, 0 0 30px rgba(173, 255, 0, 0.5)',
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}