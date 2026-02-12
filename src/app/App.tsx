import { CentralStage3D } from './components/CentralStage3D';
import { ActionLog } from './components/ActionLog';
import { VoiceFeedback } from './components/VoiceFeedback';
import { GestureKey } from './components/GestureKey';
import { PatientVitals } from './components/PatientVitals';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div
      className="size-full min-h-screen flex items-center justify-center p-8 overflow-auto"
      style={{
        background: '#050A0F',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Animated background grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <svg width="100%" height="100%" className="opacity-20">
          <defs>
            <pattern
              id="backgroundGrid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#00F2FF"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#backgroundGrid)" />
        </svg>
      </div>

      {/* Radial glow effect */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(0, 242, 255, 0.1) 0%, transparent 50%)',
        }}
      />

      {/* Main HUD Container */}
      <div className="relative z-10 w-full max-w-[1600px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1
            className="text-4xl font-mono font-bold mb-2"
            style={{
              color: '#00F2FF',
              textShadow: '0 0 20px rgba(0, 242, 255, 0.5)',
            }}
          >
            SURGICAL SPATIAL CONTROL SYSTEM
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ background: '#ADFF00' }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                className="text-sm font-mono"
                style={{ color: '#ADFF00' }}
              >
                SYSTEM ACTIVE
              </span>
            </div>
            <div className="text-sm font-mono" style={{ color: '#666' }}>
              |
            </div>
            <span className="text-sm font-mono" style={{ color: '#888' }}>
              OR-7 • CASE #2401-HRT-089
            </span>
            <div className="text-sm font-mono" style={{ color: '#666' }}>
              |
            </div>
            <span className="text-sm font-mono" style={{ color: '#888' }}>
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </motion.div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-[300px_1fr_420px] gap-6 items-start">
          {/* Left Sidebar - Patient Vitals */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PatientVitals />
          </motion.div>

          {/* Center - 3D Viewport and Controls */}
          <div className="flex flex-col items-center gap-6">
            {/* Central 3D Stage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="rounded-lg p-6 backdrop-blur-xl"
              style={{
                background: 'rgba(15, 25, 35, 0.7)',
                border: '1px solid rgba(0, 242, 255, 0.3)',
                boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div className="mb-4 text-center">
                <span
                  className="text-sm font-mono"
                  style={{ color: '#00F2FF' }}
                >
                  3D ANATOMICAL MODEL - CARDIAC
                </span>
              </div>
              <CentralStage3D />
              <div className="mt-4 flex justify-center gap-4 text-xs font-mono">
                <div style={{ color: '#888' }}>
                  X: <span style={{ color: '#00F2FF' }}>0.0°</span>
                </div>
                <div style={{ color: '#888' }}>
                  Y: <span style={{ color: '#00F2FF' }}>0.0°</span>
                </div>
                <div style={{ color: '#888' }}>
                  Z: <span style={{ color: '#00F2FF' }}>1.0x</span>
                </div>
              </div>
            </motion.div>

            {/* Bottom Controls Row */}
            <div className="flex gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <VoiceFeedback />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <GestureKey />
              </motion.div>
            </div>
          </div>

          {/* Right Sidebar - Action Log */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ActionLog />

            {/* System Status Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-6 rounded-lg p-4 backdrop-blur-xl"
              style={{
                background: 'rgba(15, 25, 35, 0.7)',
                border: '1px solid rgba(0, 242, 255, 0.2)',
                boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.1), 0 4px 20px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div className="text-xs font-mono mb-3" style={{ color: '#00F2FF' }}>
                SYSTEM STATUS
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span style={{ color: '#888' }}>Gesture Tracking</span>
                  <span style={{ color: '#ADFF00' }}>ONLINE</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#888' }}>Voice Recognition</span>
                  <span style={{ color: '#ADFF00' }}>ONLINE</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#888' }}>3D Rendering</span>
                  <span style={{ color: '#ADFF00' }}>ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#888' }}>Neural Interface</span>
                  <span style={{ color: '#00F2FF' }}>STANDBY</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-xs font-mono"
          style={{ color: '#666' }}
        >
          NOVA SURGICAL AI v3.2.1 • All systems operational • Sterile field
          maintained
        </motion.div>
      </div>
    </div>
  );
}