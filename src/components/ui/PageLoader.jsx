import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import ppVan from "@/assets/images/ppvan.jpg";
import { contactData } from "@/data";

const PageLoader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Constants for circular progress
  const radius = 60;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const duration = 2500;
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, interval);

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, duration + 500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Entrance
      tl.from(".loader-content", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".loader-ring",
          {
            drawSVG: "0%",
            strokeDashoffset: circumference,
            duration: 1.5,
            ease: "power2.out",
          },
          "<"
        )
        .from(
          ".loader-text",
          {
            y: 20,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      if (isLoaded) {
        const tl = gsap.timeline({
          onComplete: () => onLoadComplete?.(),
        });

        // Exit Animation
        tl.to(".loader-content", {
          scale: 0.9,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        })
          .to(
            containerRef.current,
            {
              yPercent: -100,
              duration: 0.8,
              ease: "power4.inOut",
            },
            "-=0.1"
          )
          .set(containerRef.current, { display: "none" });
      }
    },
    { scope: containerRef, dependencies: [isLoaded] }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-(--color-bg-primary) text-(--color-text-primary) overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-(--color-accent) blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="loader-content relative z-10 flex flex-col items-center justify-center">
        {/* Circular Progress & Image */}
        <div className="relative mb-8">
          {/* Rotating Outer Ring (Decoration) */}
          <div className="absolute inset-[-10px] border border-(--color-border) rounded-full opacity-30 animate-spin-slow" />

          {/* SVG Progress Ring */}
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-90 drop-shadow-lg"
          >
            <circle
              stroke="var(--color-surface)"
              strokeWidth={stroke}
              fill="transparent"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              className="loader-ring transition-all duration-100 ease-linear"
              stroke="var(--color-accent)"
              strokeWidth={stroke}
              strokeDasharray={circumference + " " + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              fill="transparent"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>

          {/* Profile Image Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[88px] h-[88px] rounded-full overflow-hidden border-2 border-(--color-bg-primary) shadow-inner">
              <img
                src={ppVan}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-2">
          <div className="loader-text overflow-hidden">
            <h1 className="text-4xl md:text-5xl font-light tabular-nums tracking-tighter text-(--color-text-primary)">
              {Math.round(progress)}%
            </h1>
          </div>

          <div className="loader-text overflow-hidden">
            <p className="text-sm font-medium tracking-[0.4em] text-(--color-text-secondary) uppercase pl-1">
              {contactData.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

PageLoader.propTypes = {
  onLoadComplete: PropTypes.func,
};

export default PageLoader;
