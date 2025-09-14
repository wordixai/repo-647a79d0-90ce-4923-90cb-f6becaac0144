import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring } from 'remotion';
import { useAnimationSequence } from '../hooks/useAnimationSequence';

interface LogoAnimationProps {
  logoUrl?: string;
  title: string;
  start: number;
  duration?: number;
  brandColor?: string;
  animationType?: 'morph' | 'particle' | 'glitch' | 'hologram';
}

export const LogoAnimation: React.FC<LogoAnimationProps> = ({
  logoUrl,
  title,
  start,
  duration = 90,
  brandColor = '#00ff88',
  animationType = 'morph',
}) => {
  const frame = useCurrentFrame();
  const animation = useAnimationSequence({ start, duration });
  
  const springConfig = {
    fps: 30,
    damping: 200,
    stiffness: 300,
    mass: 1,
  };
  
  const logoScale = spring({
    frame: frame - start,
    from: 0,
    to: 1,
    durationInFrames: duration / 2,
    config: springConfig,
  });
  
  const logoRotation = interpolate(
    frame - start,
    [0, duration],
    [0, animationType === 'hologram' ? 360 : 0]
  );

  return (
    <AbsoluteFill>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          opacity: animation.opacity,
        }}
      >
        {/* Logo Container */}
        <div
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: brandColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
            boxShadow: `0 0 50px ${brandColor}`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo"
              style={{
                width: '80%',
                height: '80%',
                objectFit: 'contain',
                filter: animationType === 'glitch' ? 'hue-rotate(45deg)' : 'none',
              }}
            />
          ) : (
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#ffffff',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
              }}
            >
              {title.charAt(0)}
            </div>
          )}
          
          {/* Particle Effects */}
          {animationType === 'particle' && (
            <ParticleSystem color={brandColor} />
          )}
          
          {/* Glitch Effect */}
          {animationType === 'glitch' && frame % 10 < 2 && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(45deg, transparent 40%, ${brandColor}20 50%, transparent 60%)`,
                animation: 'glitch 0.3s infinite',
              }}
            />
          )}
        </div>
        
        {/* Title */}
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: brandColor,
            textAlign: 'center',
            marginTop: '30px',
            textShadow: `0 0 20px ${brandColor}`,
            transform: `translateY(${(1 - animation.progress) * 50}px)`,
            opacity: animation.opacity,
          }}
        >
          {title}
        </h1>
        
        {/* Animated Ring */}
        <div
          style={{
            position: 'absolute',
            width: '250px',
            height: '250px',
            border: `3px solid ${brandColor}`,
            borderRadius: '50%',
            borderTop: '3px solid transparent',
            animation: 'spin 2s linear infinite',
            opacity: 0.6,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const ParticleSystem: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const particles = Array.from({ length: 20 }, (_, i) => i);
  
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {particles.map((particle) => {
        const angle = (particle / particles.length) * 360;
        const radius = 80 + Math.sin(frame * 0.1 + particle) * 20;
        const x = Math.cos((angle + frame * 2) * Math.PI / 180) * radius;
        const y = Math.sin((angle + frame * 2) * Math.PI / 180) * radius;
        
        return (
          <div
            key={particle}
            style={{
              position: 'absolute',
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              width: '4px',
              height: '4px',
              backgroundColor: color,
              borderRadius: '50%',
              boxShadow: `0 0 10px ${color}`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </div>
  );
};

export const BrandMorph: React.FC<{
  fromShape: 'circle' | 'square' | 'triangle';
  toShape: 'circle' | 'square' | 'triangle';
  color: string;
  start: number;
  duration: number;
}> = ({ fromShape, toShape, color, start, duration }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [start, start + duration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const morphPath = interpolate(
    progress,
    [0, 1],
    [getShapePath(fromShape), getShapePath(toShape)]
  );
  
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <svg width="200" height="200" viewBox="0 0 100 100">
        <path
          d={morphPath}
          fill={color}
          stroke={color}
          strokeWidth="2"
          style={{
            filter: `drop-shadow(0 0 20px ${color})`,
          }}
        />
      </svg>
    </div>
  );
};

const getShapePath = (shape: 'circle' | 'square' | 'triangle'): string => {
  switch (shape) {
    case 'circle':
      return 'M 50,10 A 40,40 0 1,1 50,90 A 40,40 0 1,1 50,10 Z';
    case 'square':
      return 'M 20,20 L 80,20 L 80,80 L 20,80 Z';
    case 'triangle':
      return 'M 50,20 L 80,70 L 20,70 Z';
    default:
      return '';
  }
};