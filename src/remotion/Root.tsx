import { Composition } from 'remotion';
import { TechShowcase } from './compositions/TechShowcase';
import { CodeReveal } from './compositions/CodeReveal';
import { APIDemo } from './compositions/APIDemo';
import { DataVisualization } from './compositions/DataVisualization';
import { ProductDemo } from './compositions/ProductDemo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TechShowcase"
        component={TechShowcase}
        durationInFrames={900} // 30 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Advanced Tech Solutions",
          subtitle: "Powered by AI & Innovation",
          features: [
            "Real-time Analytics",
            "Machine Learning",
            "Cloud Infrastructure",
            "Automated Workflows"
          ],
          brandColor: "#00ff88",
          logo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=200&fit=crop"
        }}
      />
      
      <Composition
        id="CodeReveal"
        component={CodeReveal}
        durationInFrames={600} // 20 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Code in Action",
          codeSnippets: [
            {
              language: "javascript",
              code: `const ai = new AIProcessor({
  model: 'gpt-4',
  temperature: 0.7
});

const result = await ai.process(data);
console.log('AI Analysis:', result);`,
              filename: "ai-processor.js"
            },
            {
              language: "python",
              code: `import tensorflow as tf
import numpy as np

model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(10, activation='softmax')
])`,
              filename: "model.py"
            }
          ]
        }}
      />

      <Composition
        id="APIDemo"
        component={APIDemo}
        durationInFrames={750} // 25 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "API Documentation",
          endpoints: [
            {
              method: "GET",
              path: "/api/v1/users",
              description: "Retrieve all users",
              response: { users: [], total: 0 }
            },
            {
              method: "POST",
              path: "/api/v1/users",
              description: "Create new user",
              response: { id: 1, created: true }
            }
          ]
        }}
      />

      <Composition
        id="DataVisualization"
        component={DataVisualization}
        durationInFrames={600} // 20 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Real-time Analytics",
          data: [
            { name: "Jan", value: 400, growth: 20 },
            { name: "Feb", value: 300, growth: -10 },
            { name: "Mar", value: 600, growth: 35 },
            { name: "Apr", value: 800, growth: 45 },
            { name: "May", value: 700, growth: 25 }
          ]
        }}
      />

      <Composition
        id="ProductDemo"
        component={ProductDemo}
        durationInFrames={1200} // 40 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Product Showcase",
          subtitle: "Next-Generation Platform",
          features: [
            {
              title: "AI-Powered Analytics",
              description: "Advanced machine learning algorithms",
              icon: "🤖"
            },
            {
              title: "Real-time Processing",
              description: "Instant data processing and insights",
              icon: "⚡"
            },
            {
              title: "Cloud Native",
              description: "Built for scale and reliability",
              icon: "☁️"
            }
          ],
          demoSteps: [
            "Connect your data sources",
            "Configure AI models",
            "Generate insights",
            "Deploy to production"
          ]
        }}
      />
    </>
  );
};