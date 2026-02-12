import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export function CentralStage3D() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => ({ x: prev.x + 0.5, y: prev.y + 0.5 }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPos({ x, y });
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      className="relative flex items-center justify-center"
      style={{ width: '500px', height: '500px' }}
    >
      {/* Axis Rings - ENHANCED CONTRAST */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute rounded-full border-2"
          style={{
            width: '450px',
            height: '450px',
            borderColor: '#00F2FF',
            opacity: 0.5, // Increased from 0.2
            boxShadow: '0 0 20px rgba(0, 242, 255, 0.4), inset 0 0 20px rgba(0, 242, 255, 0.2)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute rounded-full border-2"
          style={{
            width: '380px',
            height: '380px',
            borderColor: '#ADFF00',
            opacity: 0.4, // Increased from 0.15
            boxShadow: '0 0 15px rgba(173, 255, 0, 0.3), inset 0 0 15px rgba(173, 255, 0, 0.2)',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute rounded-full border-2"
          style={{
            width: '310px',
            height: '310px',
            borderColor: '#00F2FF',
            opacity: 0.35, // Increased from 0.1
            boxShadow: '0 0 10px rgba(0, 242, 255, 0.3)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* 3D Heart Wireframe - ENHANCED GLOW */}
      <div
        className="relative"
        style={{
          width: '300px',
          height: '300px',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          filter: 'drop-shadow(0 0 30px rgba(0, 242, 255, 0.6)) drop-shadow(0 0 60px rgba(0, 242, 255, 0.3))',
        }}
      >
        <motion.div
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <HeartWireframe />
        </motion.div>
      </div>

      {/* Gesture Cursor Indicator - ENHANCED */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: `${cursorPos.x}%`,
          top: `${cursorPos.y}%`,
        }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div
          className="rounded-full"
          style={{
            width: '24px',
            height: '24px',
            background: 'radial-gradient(circle, #00F2FF 0%, rgba(0, 242, 255, 0.4) 50%, transparent 70%)',
            boxShadow: '0 0 30px #00F2FF, 0 0 60px rgba(0, 242, 255, 0.5)',
          }}
        />
      </motion.div>

      {/* Grid Lines */}
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#00F2FF"
              strokeWidth="0.5"
              opacity="0.2"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

function HeartWireframe() {
  return (
    <svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      className="absolute inset-0"
    >
      {/* Rim light effect */}
      <defs>
        <filter id="rimLight">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="0" result="offsetblur" />
          <feFlood floodColor="#00F2FF" floodOpacity="0.8" />
          <feComposite in2="offsetblur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Heart shape wireframe with RIM LIGHT */}
      <g fill="none" stroke="#00F2FF" strokeWidth="2" opacity="0.9" filter="url(#rimLight)">
        {/* Main heart outline - BRIGHTER */}
        <path d="M150,250 C120,220 40,160 40,100 C40,60 70,40 100,40 C120,40 135,50 150,70 C165,50 180,40 200,40 C230,40 260,60 260,100 C260,160 180,220 150,250 Z" />
        
        {/* Internal chambers - left ventricle */}
        <path d="M100,120 L130,150 L100,200 L70,150 Z" />
        
        {/* Internal chambers - right ventricle */}
        <path d="M200,120 L230,150 L200,200 L170,150 Z" />
        
        {/* Atrial structures */}
        <ellipse cx="100" cy="80" rx="30" ry="25" />
        <ellipse cx="200" cy="80" rx="30" ry="25" />
        
        {/* Connecting vessels */}
        <path d="M150,40 L150,10" strokeWidth="2.5" />
        <path d="M100,40 L90,20" strokeWidth="2.5" />
        <path d="M200,40 L210,20" strokeWidth="2.5" />
        
        {/* Interior detail lines */}
        <line x1="150" y1="70" x2="150" y2="180" opacity="0.6" />
        <line x1="100" y1="120" x2="200" y2="120" opacity="0.6" />
        <line x1="100" y1="160" x2="200" y2="160" opacity="0.6" />
        
        {/* Wireframe cross-sections */}
        <path d="M70,100 Q150,110 230,100" opacity="0.5" />
        <path d="M70,140 Q150,150 230,140" opacity="0.5" />
        <path d="M80,180 Q150,190 220,180" opacity="0.5" />
      </g>
      
      {/* Accent highlights - ENHANCED */}
      <g fill="none" stroke="#ADFF00" strokeWidth="2" opacity="0.8">
        <circle cx="100" cy="80" r="5" />
        <circle cx="200" cy="80" r="5" />
        <circle cx="150" cy="150" r="5" />
      </g>
      
      {/* Pulsing dots at key points - BRIGHTER */}
      <g fill="#00F2FF">
        <circle cx="150" cy="70" r="3" opacity="1">
          <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="150" r="3" opacity="1">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="150" r="3" opacity="1">
          <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>
      
      {/* Additional glow circles for hero effect */}
      <g fill="#ADFF00" opacity="0.6">
        <circle cx="100" cy="80" r="2">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="80" r="2">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}