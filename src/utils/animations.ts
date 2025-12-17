import { animate } from "animejs";

interface FloatingAnimationOptions {
  yRange?: number;
  xRange?: number;
  rotationRange?: number;
  duration?: number;
  delay?: number;
}

// Floating animation (continuous)
export const floatingAnimation = (
  element: HTMLElement | Element,
  options: FloatingAnimationOptions = {}
) => {
  const {
    yRange = 20,
    xRange = 15,
    rotationRange = 10,
    duration = 4000,
    delay = 0,
  } = options;
  return animate(element, {
    translateY: [
      { to: yRange, duration, ease: "inOutSine" },
      { to: -yRange, duration, ease: "inOutSine" },
    ],
    translateX: [
      { to: xRange, duration: duration * 1.2, ease: "inOutSine" },
      { to: -xRange, duration: duration * 1.2, ease: "inOutSine" },
    ],
    rotate: [
      { to: rotationRange, duration: duration * 0.8, ease: "inOutSine" },
      { to: -rotationRange, duration: duration * 0.8, ease: "inOutSine" },
    ],
    delay,
    loop: true,
    alternate: true,
  });
};
