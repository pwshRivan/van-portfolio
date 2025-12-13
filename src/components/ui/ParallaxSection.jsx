import { useRef } from "react";
import PropTypes from "prop-types";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const ParallaxSection = ({
  children,
  className = "",
  id = "",
  floatingIcons = [],
  orbColors = [
    "from-blue-500/20 to-purple-500/20",
    "from-cyan-500/20 to-teal-500/20",
  ],
}) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Parallax Orb Latar Belakang
      gsap.to(".parallax-orb-1", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".parallax-orb-2", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Parallax Ikon Melayang
      gsap.utils.toArray(".floating-icon-wrapper").forEach((icon, i) => {
        const speed = 1 + i * 0.5; // Kecepatan bervariasi

        // Parallax Vertikal
        gsap.to(icon, {
          y: -150 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Animasi Melayang
        gsap.to(icon, {
          y: `+=${20 + i * 5}`,
          rotation: i % 2 === 0 ? 15 : -15,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.7,
        });
      });

      // Animasi Bentuk Dekoratif
      gsap.utils.toArray(".deco-shape").forEach((shape, i) => {
        // Rotasi Terus Menerus
        gsap.to(shape, {
          rotation: 360,
          duration: 25 + i * 5,
          repeat: -1,
          ease: "linear",
        });

        // Melayang Terus Menerus
        gsap.to(shape, {
          y: 30,
          x: i % 2 === 0 ? 20 : -20,
          duration: 5 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i,
        });
      });
    },
    { scope: containerRef }
  );

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

ParallaxSection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  floatingIcons: PropTypes.arrayOf(PropTypes.node),
  orbColors: PropTypes.arrayOf(PropTypes.string),
};

export default ParallaxSection;
