import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

export const useFloatingAnimation = (
  containerRef,
  selector = ".floating-icon",
  options = {}
) => {
  const {
    enableFloat = true,
    enableParallax = true,
    parallaxSpeed = 0.5,
  } = options;

  useEffect(() => {
    if (!containerRef.current) return;

    const icons = containerRef.current.querySelectorAll(selector);
    if (icons.length === 0) return;

    const animations = [];

    icons.forEach((icon, i) => {
      // 1. Continuous floating animation
      if (enableFloat) {
        const floatAnim = gsap.to(icon, {
          y: "random(-20, 20)",
          x: "random(-15, 15)",
          rotation: "random(-10, 10)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
        animations.push(floatAnim);
      }

      // 2. Scroll parallax effect
      if (enableParallax) {
        const speed = parallaxSpeed + i * 0.1;
        const parallaxAnim = gsap.to(icon, {
          yPercent: -50 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
        animations.push(parallaxAnim);
      }
    });

    return () => {
      animations.forEach((anim) => {
        anim.scrollTrigger?.kill();
        anim.kill();
      });
    };
  }, [containerRef, selector, enableFloat, enableParallax, parallaxSpeed]);
};
