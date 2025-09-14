import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { AnimatedText, KineticText } from '../components/AnimatedText';
import { LogoAnimation } from '../components/LogoAnimation';
import { GeometricShapes } from '../components/GeometricShapes';
import { ParticleField } from '../components/ParticleField';

interface TechShowcaseProps {
  title: string;
  subtitle: string;
  features: string[];
  brandColor: string;
  logo?: string;
}

export const TechShowcase: React.FC<TechShowcaseProps> = ({
  title,
  subtitle,
  features,
  brandColor,
  logo,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a' }}>
      {/* Background Particles */}
      <Sequence from={0} durationInFrames={900}>
        <ParticleField count={100} color={brandColor} />
      </Sequence>
      
      {/* Geometric Background */}
      <Sequence from={0} durationInFrames={900}>
        <GeometricShapes color={brandColor} />
      </Sequence>
      
      {/* Logo Animation */}
      <Sequence from={30} durationInFrames={120}>
        <LogoAnimation
          logoUrl={logo}
          title={title}
          start={30}
          duration={120}
          brandColor={brandColor}
          animationType="hologram"
        />
      </Sequence>
      
      {/* Main Title */}
      <Sequence from={180} durationInFrames={90}>
        <KineticText
          words={title.split(' ')}
          start={180}
          staggerDelay={15}
          fontSize={72}
          color={brandColor}
          position={{ x: 50, y: 30 }}
        />
      </Sequence>
      
      {/* Subtitle */}
      <Sequence from={300} durationInFrames={60}>
        <AnimatedText
          text={subtitle}
          start={300}
          duration={60}
          fontSize={32}
          color="#ffffff"
          effect="typewriter"
          position={{ x: 50, y: 45 }}
        />
      </Sequence>
      
      {/* Features List */}
      {features.map((feature, index) => (
        <Sequence key={index} from={420 + index * 30} durationInFrames={60}>
          <AnimatedText
            text={`✓ ${feature}`}
            start={420 + index * 30}
            duration={60}
            fontSize={24}
            color={brandColor}
            effect="slide"
            position={{ x: 30, y: 60 + index * 8 }}
          />
        </Sequence>
      ))}
      
      {/* Call to Action */}
      <Sequence from={720} durationInFrames={120}>
        <AnimatedText
          text="Experience the Future"
          start={720}
          duration={120}
          fontSize={48}
          color={brandColor}
          effect="glow"
          position={{ x: 50, y: 85 }}
        />
      </Sequence>
    </AbsoluteFill>
  );
};