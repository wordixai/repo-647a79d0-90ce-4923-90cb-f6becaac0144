import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { useAnimationSequence, useTypewriterEffect } from '../hooks/useAnimationSequence';

interface AnimatedTextProps {
  text: string;
  start: number;
  duration?: number;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  effect?: 'fade' | 'slide' | 'typewriter' | 'glow';
  position?: { x: number; y: number };
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  start,
  duration = 60,
  fontSize = 48,
  fontWeight = 'bold',
  color = '#ffffff',
  effect = 'fade',
  position = { x: 50, y: 50 },
  className = '',
}) => {
  const frame = useCurrentFrame();
  const animation = useAnimationSequence({ start, duration });
  
  const typewriterText = useTypewriterEffect(text, start, duration);
  
  const displayText = effect === 'typewriter' ? typewriterText : text;
  
  const glowEffect = effect === 'glow' ? 
    interpolate((frame - start) % 60, [0, 30, 60], [0.5, 1, 0.5]) : 1;

  const textStyles: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform: `translate(-50%, -50%) scale(${animation.scale}) translateY(${animation.translateY}px)`,
    fontSize: `${fontSize}px`,
    fontWeight,
    color,
    opacity: animation.opacity,
    textAlign: 'center',
    fontFamily: 'Inter, system-ui, sans-serif',
    textShadow: effect === 'glow' ? 
      `0 0 ${10 * glowEffect}px ${color}, 0 0 ${20 * glowEffect}px ${color}` : 'none',
    transition: 'all 0.3s ease',
  };

  if (effect === 'typewriter') {
    textStyles.borderRight = frame >= start && frame <= start + duration ? 
      `2px solid ${color}` : 'none';
    textStyles.animation = 'blink 1s infinite';
  }

  return (
    <div style={textStyles} className={className}>
      {displayText}
    </div>
  );
};

interface KineticTextProps {
  words: string[];
  start: number;
  staggerDelay?: number;
  fontSize?: number;
  color?: string;
  position?: { x: number; y: number };
}

export const KineticText: React.FC<KineticTextProps> = ({
  words,
  start,
  staggerDelay = 10,
  fontSize = 64,
  color = '#00ff88',
  position = { x: 50, y: 50 },
}) => {
  return (
    <AbsoluteFill>
      {words.map((word, index) => {
        const wordStart = start + (index * staggerDelay);
        const animation = useAnimationSequence({ 
          start: wordStart, 
          duration: 40 
        });
        
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${position.x + (index * 15)}%`,
              top: `${position.y + (index * 2)}%`,
              transform: `translate(-50%, -50%) scale(${animation.scale}) rotateX(${(1 - animation.progress) * 90}deg)`,
              fontSize: `${fontSize}px`,
              fontWeight: 'bold',
              color,
              opacity: animation.opacity,
              textShadow: `0 0 20px ${color}`,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            {word}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};