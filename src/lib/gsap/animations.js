import { gsap } from "./config";

export const fadeInUp = (element, options = {}) => {
  const { delay = 0, duration = 1, y = 50, ease = "power3.out" } = options;

  return gsap.from(element, {
    opacity: 0,
    y,
    duration,
    delay,
    ease,
  });
};

export const staggerFadeIn = (elements, options = {}) => {
  const {
    stagger = 0.2,
    duration = 0.8,
    y = 30,
    ease = "power2.out",
  } = options;

  return gsap.from(elements, {
    opacity: 0,
    y,
    stagger,
    duration,
    ease,
  });
};

export const scaleIn = (element, options = {}) => {
  const {
    delay = 0,
    duration = 0.6,
    scale = 0.9,
    ease = "back.out(1.7)",
  } = options;

  return gsap.from(element, {
    opacity: 0,
    scale,
    duration,
    delay,
    ease,
  });
};

export const parallaxScroll = (element, options = {}) => {
  const { speed = 0.5, trigger = element } = options;

  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

export const floatingAnimation = (element, options = {}) => {
  const {
    yRange = [-20, 20],
    xRange = [-15, 15],
    rotationRange = [-10, 10],
    duration = 4,
    delay = 0,
  } = options;

  return gsap.to(element, {
    y: `random(${yRange[0]}, ${yRange[1]})`,
    x: `random(${xRange[0]}, ${xRange[1]})`,
    rotation: `random(${rotationRange[0]}, ${rotationRange[1]})`,
    duration: `random(${duration - 1}, ${duration + 1})`,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay,
  });
};
