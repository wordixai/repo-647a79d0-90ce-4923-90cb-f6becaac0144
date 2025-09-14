import { useCurrentFrame, interpolate, Easing } from 'remotion';

export interface AnimationConfig {
  start: number;
  duration: number;
  easing?: Easing.EasingFunction;
}

export const useAnimationSequence = (config: AnimationConfig) => {
  const frame = useCurrentFrame();
  const { start, duration, easing = Easing.out(Easing.cubic) } = config;
  
  const progress = interpolate(
    frame,
    [start, start + duration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing,
    }
  );

  const isActive = frame >= start && frame <= start + duration;
  const isComplete = frame > start + duration;

  return {
    progress,
    isActive,
    isComplete,
    opacity: interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 1]),
    scale: interpolate(progress, [0, 1], [0.8, 1], { easing }),
    translateY: interpolate(progress, [0, 1], [50, 0], { easing }),
    translateX: interpolate(progress, [0, 1], [-50, 0], { easing }),
  };
};

export const useStaggeredAnimation = (
  items: any[],
  baseStart: number,
  staggerDelay: number = 5,
  duration: number = 30
) => {
  return items.map((_, index) => 
    useAnimationSequence({
      start: baseStart + (index * staggerDelay),
      duration,
    })
  );
};

export const useTypewriterEffect = (
  text: string,
  start: number,
  duration: number
) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [start, start + duration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const charactersToShow = Math.floor(progress * text.length);
  return text.slice(0, charactersToShow);
};

export const useGlowEffect = (start: number, duration: number) => {
  const frame = useCurrentFrame();
  const glowIntensity = interpolate(
    (frame - start) % 60,
    [0, 30, 60],
    [0.5, 1, 0.5]
  );
  
  return frame >= start && frame <= start + duration ? glowIntensity : 0;
};