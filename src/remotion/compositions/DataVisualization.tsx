import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { AnimatedText } from '../components/AnimatedText';
import { useAnimationSequence } from '../hooks/useAnimationSequence';

interface DataPoint {
  name: string;
  value: number;
  growth: number;
}

interface DataVisualizationProps {
  title: string;
  data: DataPoint[];
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({
  title,
  data,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a' }}>
      {/* Title */}
      <Sequence from={0} durationInFrames={60}>
        <AnimatedText
          text={title}
          start={0}
          duration={60}
          fontSize={56}
          color="#00d4aa"
          effect="glow"
          position={{ x: 50, y: 15 }}
        />
      </Sequence>
      
      {/* Animated Chart */}
      <Sequence from={90} durationInFrames={300}>
        <AnimatedBarChart data={data} start={90} />
      </Sequence>
      
      {/* Growth Indicators */}
      <Sequence from={420} durationInFrames={180}>
        <GrowthIndicators data={data} start={420} />
      </Sequence>
    </AbsoluteFill>
  );
};

const AnimatedBarChart: React.FC<{
  data: DataPoint[];
  start: number;
}> = ({ data, start }) => {
  const frame = useCurrentFrame();
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div
      style={{
        position: 'absolute',
        left: '10%',
        top: '30%',
        width: '80%',
        height: '50%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        borderBottom: '2px solid #333',
        borderLeft: '2px solid #333',
      }}
    >
      {data.map((item, index) => {
        const barStart = start + index * 20;
        const animation = useAnimationSequence({
          start: barStart,
          duration: 60,
        });
        
        const barHeight = (item.value / maxValue) * 100;
        const animatedHeight = animation.progress * barHeight;
        
        return (
          <div
            key={item.name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '80px',
            }}
          >
            {/* Bar */}
            <div
              style={{
                width: '60px',
                height: `${animatedHeight}%`,
                backgroundColor: '#00ff88',
                borderRadius: '4px 4px 0 0',
                position: 'relative',
                boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
                background: `linear-gradient(to top, #00ff88, #00d4aa)`,
              }}
            >
              {/* Value Label */}
              {animation.progress > 0.8 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                >
                  {item.value}
                </div>
              )}
            </div>
            
            {/* Name Label */}
            <div
              style={{
                marginTop: '10px',
                color: '#ffffff',
                fontSize: '16px',
                textAlign: 'center',
              }}
            >
              {item.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const GrowthIndicators: React.FC<{
  data: DataPoint[];
  start: number;
}> = ({ data, start }) => {
  const frame = useCurrentFrame();
  
  return (
    <div
      style={{
        position: 'absolute',
        right: '5%',
        top: '25%',
        width: '200px',
        height: '60%',
        padding: '20px',
        backgroundColor: 'rgba(0, 212, 170, 0.1)',
        border: '2px solid #00d4aa',
        borderRadius: '12px',
      }}
    >
      <h3
        style={{
          color: '#00d4aa',
          fontSize: '20px',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Growth Metrics
      </h3>
      
      {data.map((item, index) => {
        const indicatorStart = start + index * 30;
        const animation = useAnimationSequence({
          start: indicatorStart,
          duration: 60,
        });
        
        const isPositive = item.growth > 0;
        const color = isPositive ? '#00ff88' : '#ff6b6b';
        const icon = isPositive ? '↗' : '↘';
        
        return (
          <div
            key={item.name}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px',
              opacity: animation.opacity,
              transform: `translateX(${animation.translateX}px)`,
            }}
          >
            <span style={{ color: '#ffffff', fontSize: '14px' }}>
              {item.name}
            </span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color, fontSize: '16px', marginRight: '5px' }}>
                {icon}
              </span>
              <span style={{ color, fontWeight: 'bold' }}>
                {Math.abs(item.growth)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};