import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { useAnimationSequence, useTypewriterEffect } from '../hooks/useAnimationSequence';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  start: number;
  duration?: number;
  position?: { x: number; y: number; width: number; height: number };
  theme?: 'dark' | 'matrix';
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  filename,
  start,
  duration = 120,
  position = { x: 10, y: 20, width: 80, height: 60 },
  theme = 'dark',
}) => {
  const frame = useCurrentFrame();
  const animation = useAnimationSequence({ start, duration });
  
  // Split code into lines for line-by-line reveal
  const lines = code.split('\n');
  const linesPerFrame = duration / lines.length;
  
  const visibleLines = Math.floor((frame - start) / linesPerFrame);
  const currentLineProgress = ((frame - start) % linesPerFrame) / linesPerFrame;
  
  const containerStyles: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x}%`,
    top: `${position.y}%`,
    width: `${position.width}%`,
    height: `${position.height}%`,
    backgroundColor: theme === 'matrix' ? '#000a00' : '#1a1a1a',
    border: `2px solid ${theme === 'matrix' ? '#00ff41' : '#333'}`,
    borderRadius: '8px',
    padding: '20px',
    fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, monospace',
    fontSize: '14px',
    overflow: 'hidden',
    opacity: animation.opacity,
    transform: `scale(${animation.scale})`,
    boxShadow: theme === 'matrix' ? 
      '0 0 20px rgba(0, 255, 65, 0.3)' : 
      '0 10px 25px rgba(0, 0, 0, 0.5)',
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: `1px solid ${theme === 'matrix' ? '#00ff41' : '#333'}`,
  };

  const filenameStyles: React.CSSProperties = {
    color: theme === 'matrix' ? '#00ff41' : '#00d4aa',
    fontWeight: 'bold',
    marginRight: '10px',
  };

  const languageStyles: React.CSSProperties = {
    color: theme === 'matrix' ? '#66ff66' : '#888',
    fontSize: '12px',
    backgroundColor: theme === 'matrix' ? '#003300' : '#2a2a2a',
    padding: '2px 8px',
    borderRadius: '4px',
  };

  return (
    <div style={containerStyles}>
      {filename && (
        <div style={headerStyles}>
          <span style={filenameStyles}>{filename}</span>
          <span style={languageStyles}>{language}</span>
        </div>
      )}
      
      <div style={{ color: theme === 'matrix' ? '#00ff41' : '#ffffff', lineHeight: 1.6 }}>
        {lines.map((line, index) => {
          const isVisible = index < visibleLines || 
            (index === visibleLines && frame >= start);
          
          const lineText = index === visibleLines ? 
            line.slice(0, Math.floor(currentLineProgress * line.length)) : line;
          
          if (!isVisible) return null;
          
          return (
            <div
              key={index}
              style={{
                opacity: isVisible ? 1 : 0,
                animation: index === visibleLines ? 'typewriter 0.5s' : 'none',
              }}
            >
              <span style={{ color: theme === 'matrix' ? '#003300' : '#666' }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span style={{ marginLeft: '15px' }}>
                {highlightSyntax(lineText, language, theme)}
              </span>
              {index === visibleLines && frame >= start && (
                <span
                  style={{
                    color: theme === 'matrix' ? '#00ff41' : '#00d4aa',
                    animation: 'blink 1s infinite',
                  }}
                >
                  |
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const highlightSyntax = (code: string, language: string, theme: 'dark' | 'matrix') => {
  const colors = theme === 'matrix' ? {
    keyword: '#00ff41',
    string: '#66ff66',
    function: '#00cc00',
    number: '#99ff99',
    comment: '#004400',
  } : {
    keyword: '#ff79c6',
    string: '#f1fa8c',
    function: '#8be9fd',
    number: '#bd93f9',
    comment: '#6272a4',
  };

  // Simple syntax highlighting
  let highlighted = code;
  
  // Keywords
  const keywords = ['const', 'let', 'var', 'function', 'class', 'import', 'export', 'if', 'else', 'for', 'while'];
  keywords.forEach(keyword => {
    highlighted = highlighted.replace(
      new RegExp(`\\b${keyword}\\b`, 'g'),
      `<span style="color: ${colors.keyword}">${keyword}</span>`
    );
  });
  
  // Strings
  highlighted = highlighted.replace(
    /'([^']*)'|"([^"]*)"/g,
    `<span style="color: ${colors.string}">$&</span>`
  );
  
  // Functions
  highlighted = highlighted.replace(
    /(\w+)(?=\()/g,
    `<span style="color: ${colors.function}">$1</span>`
  );
  
  // Numbers
  highlighted = highlighted.replace(
    /\b\d+\b/g,
    `<span style="color: ${colors.number}">$&</span>`
  );

  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
};

export const TerminalSimulator: React.FC<{
  commands: Array<{ command: string; output: string; delay: number }>;
  start: number;
}> = ({ commands, start }) => {
  const frame = useCurrentFrame();
  const currentCommandIndex = Math.floor((frame - start) / 60);
  const currentCommand = commands[currentCommandIndex];
  
  const containerStyles: React.CSSProperties = {
    position: 'absolute',
    left: '10%',
    top: '20%',
    width: '80%',
    height: '60%',
    backgroundColor: '#000000',
    border: '2px solid #00ff00',
    borderRadius: '8px',
    padding: '20px',
    fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, monospace',
    fontSize: '16px',
    color: '#00ff00',
    overflow: 'auto',
  };

  return (
    <div style={containerStyles}>
      <div style={{ marginBottom: '10px', color: '#00ff00' }}>
        $ Terminal - {new Date().toLocaleTimeString()}
      </div>
      
      {commands.slice(0, currentCommandIndex + 1).map((cmd, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <div style={{ color: '#00ff00' }}>
            $ {cmd.command}
          </div>
          <div style={{ color: '#ffffff', marginLeft: '10px' }}>
            {cmd.output}
          </div>
        </div>
      ))}
      
      {currentCommand && (
        <div style={{ color: '#00ff00' }}>
          $ <span style={{ animation: 'blink 1s infinite' }}>_</span>
        </div>
      )}
    </div>
  );
};