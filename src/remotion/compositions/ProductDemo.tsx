import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { AnimatedText } from '../components/AnimatedText';
import { LogoAnimation } from '../components/LogoAnimation';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface ProductDemoProps {
  title: string;
  subtitle: string;
  features: Feature[];
  demoSteps: string[];
}

export const ProductDemo: React.FC<ProductDemoProps> = ({
  title,
  subtitle,
  features,
  demoSteps,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a' }}>
      {/* Hero Section */}
      <Sequence from={0} durationInFrames={180}>
        <LogoAnimation
          title={title}
          start={0}
          duration={120}
          brandColor="#00ff88"
          animationType="particle"
        />
        <AnimatedText
          text={subtitle}
          start={120}
          duration={60}
          fontSize={28}
          color="#ffffff"
          effect="typewriter"
          position={{ x: 50, y: 65 }}
        />
      </Sequence>
      
      {/* Features Section */}
      <Sequence from={240} durationInFrames={360}>
        <FeaturesShowcase features={features} start={240} />
      </Sequence>
      
      {/* Demo Steps */}
      <Sequence from={660} durationInFrames={300}>
        <DemoSteps steps={demoSteps} start={660} />
      </Sequence>
      
      {/* Call to Action */}
      <Sequence from={1020} durationInFrames={180}>
        <AnimatedText
          text="Ready to Transform Your Business?"
          start={1020}
          duration={120}
          fontSize={42}
          color="#00ff88"
          effect="glow"
          position={{ x: 50, y: 80 }}
        />
        <AnimatedText
          text="Get Started Today"
          start={1080}
          duration={120}
          fontSize={32}
          color="#ffffff"
          effect="fade"
          position={{ x: 50, y: 90 }}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

const FeaturesShowcase: React.FC<{
  features: Feature[];
  start: number;
}> = ({ features, start }) => {
  return (
    <div style={{ padding: '5%' }}>
      <AnimatedText
        text="Key Features"
        start={start}
        duration={60}
        fontSize={48}
        color="#00d4aa"
        effect="fade"
        position={{ x: 50, y: 20 }}
      />
      
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '10%',
          right: '10%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
        }}
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            feature={feature}
            start={start + 60 + index * 60}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{
  feature: Feature;
  start: number;
  index: number;
}> = ({ feature, start, index }) => {
  return (
    <Sequence from={start} durationInFrames={180}>
      <div
        style={{
          padding: '25px',
          backgroundColor: 'rgba(0, 212, 170, 0.1)',
          border: '2px solid #00d4aa',
          borderRadius: '12px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          style={{
            fontSize: '48px',
            marginBottom: '15px',
          }}
        >
          {feature.icon}
        </div>
        
        <AnimatedText
          text={feature.title}
          start={start + 20}
          duration={40}
          fontSize={24}
          color="#00ff88"
          effect="fade"
          position={{ x: 50, y: 40 }}
        />
        
        <AnimatedText
          text={feature.description}
          start={start + 60}
          duration={60}
          fontSize={16}
          color="#ffffff"
          effect="typewriter"
          position={{ x: 50, y: 70 }}
        />
      </div>
    </Sequence>
  );
};

const DemoSteps: React.FC<{
  steps: string[];
  start: number;
}> = ({ steps, start }) => {
  return (
    <div style={{ padding: '5%' }}>
      <AnimatedText
        text="How It Works"
        start={start}
        duration={60}
        fontSize={48}
        color="#00d4aa"
        effect="fade"
        position={{ x: 50, y: 15 }}
      />
      
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '10%',
          right: '10%',
        }}
      >
        {steps.map((step, index) => (
          <Sequence key={index} from={start + 60 + index * 60} durationInFrames={120}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '25px',
                padding: '20px',
                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                border: '2px solid #00ff88',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#00ff88',
                  color: '#000',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginRight: '20px',
                  boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
                }}
              >
                {index + 1}
              </div>
              
              <AnimatedText
                text={step}
                start={start + 80 + index * 60}
                duration={60}
                fontSize={20}
                color="#ffffff"
                effect="typewriter"
                position={{ x: 30, y: 50 }}
              />
            </div>
          </Sequence>
        ))}
      </div>
    </div>
  );
};