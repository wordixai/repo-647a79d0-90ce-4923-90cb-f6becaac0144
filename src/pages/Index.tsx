import React, { useState, useRef } from 'react';
import { Player } from '@remotion/player';
import { RemotionRoot } from '../remotion/Root';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Play, Download, Settings, Code, BarChart3, Monitor, Zap } from 'lucide-react';

const Index = () => {
  const [selectedComposition, setSelectedComposition] = useState('TechShowcase');
  const [isPlaying, setIsPlaying] = useState(false);
  const [customProps, setCustomProps] = useState({
    title: 'Advanced Tech Solutions',
    subtitle: 'Powered by AI & Innovation',
    brandColor: '#00ff88',
  });
  
  const playerRef = useRef<any>(null);

  const compositions = [
    {
      id: 'TechShowcase',
      name: 'Tech Showcase',
      description: 'Modern tech presentation with animated logos and features',
      icon: <Monitor className="w-5 h-5" />,
      duration: '30s',
      category: 'Marketing'
    },
    {
      id: 'CodeReveal',
      name: 'Code Reveal',
      description: 'Animated code snippets with syntax highlighting and typewriter effects',
      icon: <Code className="w-5 h-5" />,
      duration: '20s',
      category: 'Education'
    },
    {
      id: 'APIDemo',
      name: 'API Documentation',
      description: 'Interactive API endpoint demonstrations with request/response flows',
      icon: <Zap className="w-5 h-5" />,
      duration: '25s',
      category: 'Technical'
    },
    {
      id: 'DataVisualization',
      name: 'Data Visualization',
      description: 'Animated charts and real-time analytics dashboards',
      icon: <BarChart3 className="w-5 h-5" />,
      duration: '20s',
      category: 'Analytics'
    },
    {
      id: 'ProductDemo',
      name: 'Product Demo',
      description: 'Complete product showcase with features and workflow demonstrations',
      icon: <Monitor className="w-5 h-5" />,
      duration: '40s',
      category: 'Marketing'
    }
  ];

  const templates = [
    {
      name: 'Startup Pitch',
      props: {
        title: 'Revolutionary AI Platform',
        subtitle: 'Transforming Business Intelligence',
        brandColor: '#6366f1',
        features: ['Machine Learning', 'Real-time Analytics', 'Cloud Integration', 'API First']
      }
    },
    {
      name: 'SaaS Product',
      props: {
        title: 'CloudSync Pro',
        subtitle: 'Seamless Data Synchronization',
        brandColor: '#10b981',
        features: ['Multi-platform', 'Real-time Sync', 'Enterprise Security', 'Developer APIs']
      }
    },
    {
      name: 'Tech Conference',
      props: {
        title: 'Future of Development',
        subtitle: 'Next-Gen Tools & Frameworks',
        brandColor: '#f59e0b',
        features: ['AI-Powered', 'Low-Code', 'Cloud Native', 'Open Source']
      }
    }
  ];

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const applyTemplate = (template: any) => {
    setCustomProps(template.props);
  };

  return (
    <div className="min-h-screen bg-background text-foreground matrix-bg">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 glow-cyan">
            Remotion Video Studio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Create dynamic, tech-focused videos with advanced animations, code reveals, 
            and data visualizations. Perfect for product demos, tutorials, and presentations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5 text-primary" />
                    Video Preview
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-neon-green border-neon-green">
                      {compositions.find(c => c.id === selectedComposition)?.duration}
                    </Badge>
                    <Badge variant="outline" className="text-neon-cyan border-neon-cyan">
                      1920x1080
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <Player
                    ref={playerRef}
                    component={RemotionRoot}
                    compositionWidth={1920}
                    compositionHeight={1080}
                    durationInFrames={900}
                    fps={30}
                    style={{
                      width: '100%',
                      height: 'auto',
                      aspectRatio: '16/9',
                    }}
                    controls
                    loop
                    inputProps={customProps}
                  />
                </div>
                
                <div className="flex gap-4 mt-6">
                  <Button onClick={handlePlayPause} className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Video
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Advanced Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Sidebar */}
          <div className="space-y-6">
            {/* Composition Selector */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Video Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {compositions.map((comp) => (
                  <div
                    key={comp.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedComposition === comp.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedComposition(comp.id)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {comp.icon}
                      <div>
                        <h3 className="font-semibold">{comp.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {comp.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {comp.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Templates */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Quick Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {templates.map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => applyTemplate(template)}
                  >
                    {template.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Customization Panel */}
        <Card className="mt-8 bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Video Customization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
                <TabsTrigger value="animation">Animation</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Main Title</Label>
                      <Input
                        id="title"
                        value={customProps.title}
                        onChange={(e) => setCustomProps({...customProps, title: e.target.value})}
                        placeholder="Enter your main title"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={customProps.subtitle}
                        onChange={(e) => setCustomProps({...customProps, subtitle: e.target.value})}
                        placeholder="Enter your subtitle"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="brand-color">Brand Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="brand-color"
                          type="color"
                          value={customProps.brandColor}
                          onChange={(e) => setCustomProps({...customProps, brandColor: e.target.value})}
                          className="w-20"
                        />
                        <Input
                          value={customProps.brandColor}
                          onChange={(e) => setCustomProps({...customProps, brandColor: e.target.value})}
                          placeholder="#00ff88"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="logo">Logo URL</Label>
                      <Input
                        id="logo"
                        placeholder="https://your-logo-url.com/logo.png"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="features">Features (one per line)</Label>
                      <Textarea
                        id="features"
                        placeholder="Real-time Analytics&#10;Machine Learning&#10;Cloud Infrastructure&#10;Automated Workflows"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="style" className="space-y-6 mt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select defaultValue="dark">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Dark Matrix</SelectItem>
                        <SelectItem value="neon">Neon Cyber</SelectItem>
                        <SelectItem value="minimal">Minimal Tech</SelectItem>
                        <SelectItem value="hologram">Hologram</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="font">Font Style</Label>
                    <Select defaultValue="modern">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern Sans</SelectItem>
                        <SelectItem value="tech">Tech Mono</SelectItem>
                        <SelectItem value="futuristic">Futuristic</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="effects">Visual Effects</Label>
                    <Select defaultValue="high">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High Impact</SelectItem>
                        <SelectItem value="maximum">Maximum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="animation" className="space-y-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="timing">Animation Timing</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slow">Slow & Dramatic</SelectItem>
                          <SelectItem value="medium">Medium Pace</SelectItem>
                          <SelectItem value="fast">Fast & Energetic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="transitions">Transition Style</Label>
                      <Select defaultValue="smooth">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="smooth">Smooth Slides</SelectItem>
                          <SelectItem value="bouncy">Bouncy</SelectItem>
                          <SelectItem value="elastic">Elastic</SelectItem>
                          <SelectItem value="glitch">Glitch Effects</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="particles">Particle Effects</Label>
                      <Select defaultValue="enabled">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="disabled">Disabled</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="intensive">Intensive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="easing">Easing Curves</Label>
                      <Select defaultValue="cubic">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="linear">Linear</SelectItem>
                          <SelectItem value="cubic">Cubic</SelectItem>
                          <SelectItem value="elastic">Elastic</SelectItem>
                          <SelectItem value="bounce">Bounce</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="export" className="space-y-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="resolution">Resolution</Label>
                      <Select defaultValue="1080p">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="720p">720p HD</SelectItem>
                          <SelectItem value="1080p">1080p Full HD</SelectItem>
                          <SelectItem value="4k">4K Ultra HD</SelectItem>
                          <SelectItem value="mobile">Mobile Optimized</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="format">Output Format</Label>
                      <Select defaultValue="mp4">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mp4">MP4 (H.264)</SelectItem>
                          <SelectItem value="webm">WebM</SelectItem>
                          <SelectItem value="gif">Animated GIF</SelectItem>
                          <SelectItem value="mov">MOV (ProRes)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="quality">Quality</Label>
                      <Select defaultValue="high">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Web Optimized</SelectItem>
                          <SelectItem value="high">High Quality</SelectItem>
                          <SelectItem value="lossless">Lossless</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="platform">Platform Preset</Label>
                      <Select defaultValue="youtube">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Video
                  </Button>
                  <Button variant="outline">
                    Batch Export
                  </Button>
                  <Button variant="outline">
                    Export Settings
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Advanced Animations</h3>
              </div>
              <p className="text-muted-foreground">
                Physics-based animations, particle systems, and kinetic typography 
                with precise timing control and professional easing curves.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Real-time Preview</h3>
              </div>
              <p className="text-muted-foreground">
                See your changes instantly with 60fps preview, hot reloading, 
                and interactive timeline scrubbing for perfect timing.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Data Visualization</h3>
              </div>
              <p className="text-muted-foreground">
                Animated charts, metrics, and dashboards that bring your data 
                to life with smooth transitions and interactive elements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;