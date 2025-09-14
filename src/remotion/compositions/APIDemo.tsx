import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { AnimatedText } from '../components/AnimatedText';
import { useAnimationSequence } from '../hooks/useAnimationSequence';

interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  response: any;
}

interface APIDemoProps {
  title: string;
  endpoints: APIEndpoint[];
}

export const APIDemo: React.FC<APIDemoProps> = ({ title, endpoints }) => {
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
      
      {/* API Endpoints */}
      {endpoints.map((endpoint, index) => (
        <Sequence key={index} from={120 + index * 180} durationInFrames={150}>
          <APIEndpointDemo
            endpoint={endpoint}
            start={120 + index * 180}
            position={{ x: 10, y: 30 + index * 35 }}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

const APIEndpointDemo: React.FC<{
  endpoint: APIEndpoint;
  start: number;
  position: { x: number; y: number };
}> = ({ endpoint, start, position }) => {
  const frame = useCurrentFrame();
  const animation = useAnimationSequence({ start, duration: 150 });
  
  const methodColors = {
    GET: '#00ff88',
    POST: '#ffd700',
    PUT: '#ff6b6b',
    DELETE: '#ff4757',
  };
  
  const requestAnimation = interpolate(
    frame - start,
    [30, 90],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: '80%',
        opacity: animation.opacity,
        transform: `translateX(${animation.translateX}px)`,
      }}
    >
      {/* Request */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#1a1a1a',
          border: '2px solid #333',
          borderRadius: '8px',
          fontFamily: 'SF Mono, Monaco, monospace',
        }}
      >
        <span
          style={{
            backgroundColor: methodColors[endpoint.method],
            color: '#000',
            padding: '4px 8px',
            borderRadius: '4px',
            fontWeight: 'bold',
            marginRight: '15px',
          }}
        >
          {endpoint.method}
        </span>
        <span style={{ color: '#ffffff', fontSize: '18px' }}>
          {endpoint.path}
        </span>
      </div>
      
      {/* Description */}
      <div
        style={{
          color: '#888',
          marginBottom: '15px',
          fontSize: '16px',
        }}
      >
        {endpoint.description}
      </div>
      
      {/* Response Animation */}
      {requestAnimation > 0 && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#001100',
            border: '2px solid #00ff88',
            borderRadius: '8px',
            fontFamily: 'SF Mono, Monaco, monospace',
            opacity: requestAnimation,
            transform: `translateY(${(1 - requestAnimation) * 20}px)`,
          }}
        >
          <div style={{ color: '#00ff88', marginBottom: '10px' }}>
            Response:
          </div>
          <pre style={{ color: '#ffffff', margin: 0 }}>
            {JSON.stringify(endpoint.response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};