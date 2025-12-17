import { useRef, useEffect } from "react";
import { animate, stagger } from "animejs";

// Animation config
export const ANIMATION_CONFIG = {
  duration: 800,
  ease: "outCubic",
  staggerDelay: 80,
  translateY: 40,
  sectionDelay: 0,
};

interface AnimationConfig {
  y?: number;
  duration?: number;
  ease?: string;
  scale?: number;
  stagger?: number;
  startDelay?: number;
  delay?: number;
}

interface AnimationOptions extends IntersectionObserverInit {
  threshold?: number;
}

// Scroll animation hook
export function useScrollAnimation(
  animations: Record<string, AnimationConfig> = {},
  options: AnimationOptions = {}
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            Object.entries(animations).forEach(([selector, config]) => {
              if (containerRef.current) {
                const elements =
                  containerRef.current.querySelectorAll(selector);
                if (elements.length > 0) {
                  const animationProps: any = {
                    translateY: [config.y ?? ANIMATION_CONFIG.translateY, 0],
                    opacity: [0, 1],
                    duration: config.duration ?? ANIMATION_CONFIG.duration,
                    ease: config.ease ?? ANIMATION_CONFIG.ease,
                  };

                  if (config.scale) {
                    animationProps.scale = [config.scale, 1];
                  }
                  if (config.stagger) {
                    animationProps.delay = stagger(config.stagger, {
                      start: config.startDelay ?? 0,
                    });
                  } else {
                    animationProps.delay = config.delay ?? 0;
                  }

                  animate(elements, animationProps);
                }
              }
            });
          }
        });
      },
      { threshold: options.threshold ?? 0.15, ...options }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animations, options]);

  return containerRef;
}
