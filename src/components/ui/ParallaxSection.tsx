import { useRef, useEffect, type ReactNode } from "react";
import { animate } from "animejs";

interface ParallaxSectionProps {
  children?: ReactNode;
  className?: string;
  id?: string;
  floatingIcons?: ReactNode[];
  orbColors?: string[];
}

const ParallaxSection = ({
  children,
  className = "",
  id = "",
  floatingIcons = [],
  orbColors = [
    "from-blue-500/20 to-purple-500/20",
    "from-cyan-500/20 to-teal-500/20",
  ],
}: ParallaxSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const animations: ReturnType<typeof animate>[] = [];

    // Floating Icons Animation
    const floatingIconWrappers = containerRef.current.querySelectorAll(
      ".floating-icon-wrapper"
    );
    floatingIconWrappers.forEach((icon, i) => {
      const yOffset = 20 + i * 5;
      const rotation = i % 2 === 0 ? 15 : -15;
      const duration = (3 + i) * 1000;

      const floatAnim = animate(icon, {
        translateY: [
          { to: yOffset, duration, ease: "inOutSine" },
          { to: -yOffset, duration, ease: "inOutSine" },
        ],
        rotate: [
          { to: rotation, duration, ease: "inOutSine" },
          { to: -rotation, duration, ease: "inOutSine" },
        ],
        delay: i * 700,
        loop: true,
        alternate: true,
      });
      animations.push(floatAnim);
    });

    // Decorative Shapes Animation
    const decoShapes = containerRef.current.querySelectorAll(".deco-shape");
    decoShapes.forEach((shape, i) => {
      // Continuous rotation
      const rotateAnim = animate(shape, {
        rotate: [0, 360],
        duration: (25 + i * 5) * 1000,
        loop: true,
        ease: "linear",
      });
      animations.push(rotateAnim);

      // Floating
      const xDir = i % 2 === 0 ? 20 : -20;
      const duration = (5 + i) * 1000;

      const floatAnim = animate(shape, {
        translateY: [
          { to: 30, duration, ease: "inOutSine" },
          { to: -30, duration, ease: "inOutSine" },
        ],
        translateX: [
          { to: xDir, duration, ease: "inOutSine" },
          { to: -xDir, duration, ease: "inOutSine" },
        ],
        delay: i * 1000,
        loop: true,
        alternate: true,
      });
      animations.push(floatAnim);
    });

    return () => {
      animations.forEach((anim) => {
        if (anim && anim.pause) anim.pause();
      });
    };
  }, []);

  return (
    <section
      id={id}
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Layer Latar Belakang */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Orbs */}
        <div
          className={`parallax-orb-1 absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-[80px] bg-linear-to-br ${orbColors[0]} opacity-30 will-change-transform`}
        />
        <div
          className={`parallax-orb-2 absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-[80px] bg-linear-to-tr ${orbColors[1]} opacity-25 will-change-transform`}
        />

        {/* Bentuk Dekoratif */}
        <div className="deco-shape absolute top-[20%] left-[10%] w-4 h-4 rounded-full border border-(--color-accent) opacity-20 will-change-transform" />
        <div className="deco-shape absolute top-[60%] right-[15%] w-6 h-6 border border-(--color-accent) opacity-20 rotate-45 will-change-transform" />
        <div className="deco-shape absolute bottom-[20%] left-[20%] w-3 h-3 bg-(--color-accent) rounded-full opacity-10 will-change-transform" />
        <div className="deco-shape absolute top-[30%] right-[30%] w-2 h-2 bg-(--color-accent) rounded-full opacity-20 will-change-transform" />

        {/* Ikon */}
        {floatingIcons.map((icon, index) => (
          <div
            key={index}
            className={`floating-icon-wrapper absolute opacity-30 text-(--color-accent) will-change-transform`}
            style={{
              // Distribusi ikon secara acak namun terkontrol
              top: `${20 + index * 25}%`,
              left: index % 2 === 0 ? `${10 + index * 5}%` : "auto",
              right: index % 2 !== 0 ? `${10 + index * 5}%` : "auto",
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Konten */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </section>
  );
};

export default ParallaxSection;
