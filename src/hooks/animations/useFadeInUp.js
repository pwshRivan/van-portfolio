import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

export const useFadeInUp = (ref, options = {}) => {
  const {
    trigger = null,
    start = "top 85%",
    toggleActions = "play none none reverse",
    y = 50,
    duration = 1,
    ease = "power3.out",
    delay = 0,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const animation = gsap.fromTo(
      ref.current,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: trigger || ref.current,
          start,
          toggleActions,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [ref, trigger, start, toggleActions, y, duration, ease, delay]);
};
