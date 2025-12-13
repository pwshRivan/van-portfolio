import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(ScrollTrigger);
export const gsapConfig = {
  defaults: {
    ease: "power3.out",
    duration: 1,
  },
  scrollTrigger: {
    start: "top 85%",
    toggleActions: "play none none reverse",
  },
};

export const createTimeline = (options = {}) => {
  return gsap.timeline({
    defaults: { ...gsapConfig.defaults, ...options.defaults },
    scrollTrigger: options.scrollTrigger
      ? { ...gsapConfig.scrollTrigger, ...options.scrollTrigger }
      : undefined,
    ...options,
  });
};

export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

export { gsap, ScrollTrigger };
