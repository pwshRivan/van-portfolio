import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGSAP } from "@gsap/react";
import { useTypingEffect, useFloatingAnimation } from "@/hooks";
import { HeroBackground, HeroContent, HeroActions } from "./hero";
import { gsap } from "@/lib/gsap";

const HeroSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const fullName = t("hero.title_highlight");

  // Use typing effect hook
  const typedName = useTypingEffect(fullName, {
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseAfterTyping: 2000,
    pauseAfterDeleting: 500,
    initialDelay: 500,
    loop: true,
  });

  // Floating icons animation
  useFloatingAnimation(containerRef, ".floating-icon", {
    enableFloat: true,
    enableParallax: true,
    parallaxSpeed: 0.5,
  });

  // Main content animations
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      // Animate text elements
      tl.fromTo(
        ".hero-text-reveal > .hero-intro, .hero-text-reveal > .hero-subtitle, .hero-text-reveal > .hero-desc",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      // Actions float up
      tl.to(".hero-actions", { y: 0, opacity: 1, duration: 0.8 }, "-=0.5");
    },
    { scope: containerRef }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-(--color-bg-primary) text-(--color-text-primary) transition-colors duration-700"
    >
      {/* Background with floating icons */}
      <HeroBackground />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center min-h-[80vh] text-center">
        <HeroContent t={t} typedName={typedName} />

        {/* CTA Buttons */}
        <HeroActions
          t={t}
          className="hero-actions opacity-0 translate-y-4 mt-8"
        />
      </div>
    </section>
  );
};

export default HeroSection;
