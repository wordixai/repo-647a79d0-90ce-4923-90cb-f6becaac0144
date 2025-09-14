import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { CodeBlock, TerminalSimulator } from '../components/CodeBlock';
import { AnimatedText } from '../components/AnimatedText';

interface CodeSnippet {
  language: string;
  code: string;
  filename: string;
}

interface CodeRevealProps {
  title: string;
  codeSnippets: CodeSnippet[];
}

export const CodeReveal: React.FC<CodeRevealProps> = ({
  title,
  codeSnippets,
}) => {
  const terminalCommands = [
    { command: 'npm install ai-processor', output: '✓ Package installed successfully', delay: 60 },
    { command: 'node ai-processor.js', output: 'AI Analysis: Processing complete...', delay: 120 },
    { command: 'python model.py', output: 'Model trained successfully!', delay: 180 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a' }}>
      {/* Title */}
      <Sequence from={0} durationInFrames={60}>
        <AnimatedText
          text={title}
          start={0}
          duration={60}
          fontSize={56}
          color="#00ff88"
          effect="typewriter"
          position={{ x: 50, y: 15 }}
        />
      </Sequence>
      
      {/* Code Blocks */}
      {codeSnippets.map((snippet, index) => (
        <Sequence key={index} from={90 + index * 180} durationInFrames={150}>
          <CodeBlock
            code={snippet.code}
            language={snippet.language}
            filename={snippet.filename}
            start={90 + index * 180}
            duration={150}
            position={{
              x: index % 2 === 0 ? 5 : 55,
              y: 25,
              width: 40,
              height: 50,
            }}
            theme="matrix"
          />
        </Sequence>
      ))}
      
      {/* Terminal Simulation */}
      <Sequence from={450} durationInFrames={150}>
        <TerminalSimulator
          commands={terminalCommands}
          start={450}
        />
      </Sequence>
    </AbsoluteFill>
  );
};