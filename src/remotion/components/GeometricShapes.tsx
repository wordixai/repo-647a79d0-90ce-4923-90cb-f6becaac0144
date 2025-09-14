import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

interface GeometricShapesProps {
  color: string;
  complexity?: 'simple' | 'complex';
}

export const GeometricShapes: React.FC<GeometricShapesProps> = ({
  color,
  complexity = 'simple',
}) => {
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill>
      {/* Animated Hexagons */}
      {Array.from({ length: complexity === 'complex' ? 12 : 6 }, (_, i) => (
        <AnimatedHexagon
          key={`hex-${i}`}
          color={color}
          index={i}
          frame={frame}
        />
      ))}
      
      {/* Floating Triangles */}
      {Array.from({ length: complexity === 'complex' ? 8 : 4 }, (_, i) => (
        <FloatingTriangle
          key={`tri-${i}`}
          color={color}
          index={i}
          frame={frame}
        />
      ))}
      
      {/* Grid Lines */}
      <GridPattern color={color} frame={frame} />
    </AbsoluteFill>
  );
};

const AnimatedHexagon: React.FC<{
  color: string;
  index: number;
  frame: number;
}> = ({ color, index, frame }) => {
  const size = 60 + (index % 3) * 20;
  const rotation = interpolate(frame, [0, 600], [0, 360]) + index * 30;
  const opacity = interpolate(
    Math.sin((frame + index * 20) * 0.05),
    [-1, 1],
    [0.1, 0.4]
  );
  
  const x = 20 + (index % 4) * 25;
  const y = 20 + Math.floor(index / 4) * 30;
  
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `rotate(${rotation}deg)`,
        opacity,
      }}
    >
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <polygon
          points="50,5 85,25 85,75 50,95 15,75 15,25"
          fill="none"
          stroke={color}
          strokeWidth="2"
          style={{
            filter: `drop-shadow(0 0 5px ${color})`,
          }}
        />
      </svg>
    </div>
  );
};

const FloatingTriangle: React.FC<{
  color: string;
  index: number;
  frame: number;
}> = ({ color, index, frame }) => {
  const floatY = interpolate(
    Math.sin((frame + index * 40) * 0.03),
    [-1, 1],
    [-20, 20]
  );
  const rotation = interpolate(frame, [0, 600], [0, 180]) + index * 45;
  const scale = interpolate(
    Math.cos((frame + index * 30) * 0.02),
    [-1, 1],
    [0.8, 1.2]
  );
  
  const x = 70 + (index % 2) * 15;
  const y = 30 + Math.floor(index / 2) * 25;
  
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: '40px',
        height: '40px',
        transform: `translateY(${floatY}px) rotate(${rotation}deg) scale(${scale})`,
        opacity: 0.6,
      }}
    >
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <polygon
          points="50,10 90,80 10,80"
          fill="none"
          stroke={color}
          strokeWidth="3"
          style={{
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />
      </svg>
    </div>
  );
};

const GridPattern: React.FC<{
  color: string;
  frame: number;
}> = ({ color, frame }) => {
  const opacity = interpolate(
    Math.sin(frame * 0.02),
    [-1, 1],
    [0.05, 0.15]
  );
  
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity,
        backgroundImage: `
          linear-gradient(${color}20 1px, transparent 1px),
          linear-gradient(90deg, ${color}20 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'matrix-rain 10s linear infinite',
      }}
    />
  );
};

export const ParticleField: React.FC<{
  count: number;
  color: string;
}> = ({ count, color }) => {
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill>
      {Array.from({ length: count }, (_, i) => (
        <Particle key={i} index={i} color={color} frame={frame} />
      ))}
    </AbsoluteFill>
  );
};

const Particle: React.FC<{
  index: number;
  color: string;
  frame: number;
}> = ({ index, color, frame }) => {
  const x = (index * 137.508) % 100; // Golden angle distribution
  const y = ((index * 137.508) / 2) % 100;
  const size = 2 + (index % 3);
  
  const pulseScale = interpolate(
    Math.sin((frame + index * 10) * 0.1),
    [-1, 1],
    [0.5, 1.5]
  );
  
  const opacity = interpolate(
    Math.cos((frame + index * 5) * 0.05),
    [-1, 1],
    [0.2, 0.8]
  );
  
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: '50%',
        transform: `scale(${pulseScale})`,
        opacity,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
    />
  );
};