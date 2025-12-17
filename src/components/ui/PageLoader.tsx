import { useEffect, useState, useRef } from "react";
import { animate } from "animejs";
import ppVan from "@/assets/images/ppvan.jpg";

interface PageLoaderProps {
  onLoadComplete?: () => void;
}

const PageLoader = ({ onLoadComplete }: PageLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);

  // Progress simulation
  useEffect(() => {
    const duration = 2000;
    const interval = 30;
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
      setIsExiting(true);
    }, duration + 300);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!containerRef.current) return;

    const content = containerRef.current.querySelector(".loader-content");
    const photo = containerRef.current.querySelector(".loader-photo");

    if (content) {
      animate(content, {
        opacity: [0, 1],
        duration: 800,
        ease: "outExpo",
      });
    }

    if (photo) {
      animate(photo, {
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 1000,
        ease: "outExpo",
      });
    }
  }, []);

  // Exit animation
  useEffect(() => {
    if (!isExiting || !containerRef.current) return;

    const content = containerRef.current.querySelector(".loader-content");

    if (content) {
      animate(content, {
        opacity: [1, 0],
        scale: [1, 0.95],
        duration: 400,
        ease: "inQuad",
      });
    }

    animate(containerRef.current, {
      opacity: [1, 0],
      duration: 600,
      delay: 300,
      ease: "inQuad",
      complete: () => onLoadComplete?.(),
    });
  }, [isExiting, onLoadComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-(--color-bg-primary)"
    >
      <div className="loader-content flex flex-col items-center gap-6 opacity-0">
        {/* Profile photo with progress ring */}
        <div className="loader-photo relative">
          {/* Outer ring */}
          <div className="absolute inset-[-4px] rounded-full border border-(--color-border) opacity-50" />

          {/* Progress ring */}
          <svg className="absolute inset-[-8px] w-[calc(100%+16px)] h-[calc(100%+16px)] -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="calc(50% - 1px)"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.51} 251`}
              className="transition-all duration-100 ease-out"
            />
          </svg>

          {/* Photo */}
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src={ppVan}
              alt="Loading"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Percentage only */}
        <span className="text-sm font-mono text-(--color-text-secondary) tabular-nums tracking-wider">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default PageLoader;
