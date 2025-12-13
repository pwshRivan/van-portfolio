import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

export const useStaggerFadeIn = (containerRef, selector, options = {}) => {
  const {
    trigger = null,
    start = "top 85%",
    toggleActions = "play none none reverse",
    y = 30,
    stagger = 0.1,
    duration = 0.8,
    ease = "power3.out",
    scale = 1,
  } = options;

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    const animation = gsap.fromTo(
      elements,
      { y, opacity: 0, scale: scale < 1 ? scale : 1 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: trigger || containerRef.current,
          start,
          toggleActions,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [
    containerRef,
    selector,
    trigger,
    start,
    toggleActions,
    y,
    stagger,
    duration,
    ease,
    scale,
  ]);
};
