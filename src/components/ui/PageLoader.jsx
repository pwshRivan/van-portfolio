import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import vanLogo from "@/assets/van.svg";

/**
 * Komponen Loader Halaman Penuh
 */
const PageLoader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const duration = 2000;
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
    }, duration + 800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);


  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Animasi Muncul
      tl.from(".loader-spotlight", {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      })
      .from(".loader-logo", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=1")
      .from(".loader-name", {
        y: 10,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.8")
      .from(".loader-bar-container", {
        scaleX: 0,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6")
      .from(".loader-percent", {
        y: 5,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      }, "-=0.4");

    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      if (isLoaded) {
        const tl = gsap.timeline({
          onComplete: () => onLoadComplete?.(),
        });

        tl.to(".loader-content", {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: "power2.in",
        }).to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
          },
          "-=0.4"
        );
      }
    },
    { scope: containerRef, dependencies: [isLoaded] }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-(--color-bg-primary) overflow-hidden"
    >
      {/* Spotlight */}
      <div className="loader-spotlight absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_closest-side,rgba(var(--color-accent-rgb),0.15),transparent)] pointer-events-none" />

      <div className="loader-content flex flex-col items-center gap-6 relative z-10">
        {/* Logo */}
        <div className="loader-logo relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center rounded-full bg-(--color-surface)/10 backdrop-blur-md border border-(--color-border)/20 shadow-2xl">
          <div className="absolute inset-0 rounded-full bg-linear-to-tr from-(--color-accent)/10 to-transparent opacity-50" />
          <img
            src={vanLogo}
            alt="M Rivan Sahronie"
            className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg relative z-10"
          />
        </div>

        {/* Name */}
        <div className="loader-name">
           <h1 className="text-sm md:text-base font-medium tracking-[0.3em] text-(--color-text-primary) uppercase text-center">
              M Rivan Sahronie
           </h1>
        </div>

        {/* Progress Bar */}
        <div className="loader-bar-container w-48 md:w-64 h-[2px] bg-(--color-surface) rounded-full overflow-hidden relative mt-2">
          <div 
            className="h-full bg-(--color-accent) transition-all duration-100 ease-linear relative shadow-[0_0_10px_var(--color-accent)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <div className="loader-percent">
          <span className="text-xs font-medium tabular-nums text-(--color-text-tertiary) tracking-widest">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};

PageLoader.propTypes = {
  onLoadComplete: PropTypes.func,
};

export default PageLoader;
