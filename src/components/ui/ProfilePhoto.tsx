import { useRef, useEffect } from "react";
import { animate } from "animejs";

interface ProfilePhotoProps {
  src: string;
  alt: string;
  className?: string;
}

const ProfilePhoto = ({ src, alt, className = "" }: ProfilePhotoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    const profileContainer =
      containerRef.current?.querySelector(".profile-container");
    if (!profileContainer) return;

    animationRef.current = animate(profileContainer, {
      translateY: [
        { to: -15, duration: 1500, ease: "inOutSine" },
        { to: 0, duration: 1500, ease: "inOutSine" },
      ],
      loop: true,
      alternate: true,
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.revert();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-3/4 max-w-sm mx-auto ${className}`}
    >
      {/* Animation Container */}
      <div className="profile-container relative w-full h-full">
        {/* Photo */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden bg-linear-to-br from-(--color-accent) via-(--color-text-primary) to-(--color-accent) p-0.5">
          <div className="w-full h-full rounded-3xl overflow-hidden bg-(--color-bg-primary)">
            <img
              src={src}
              alt={alt}
              width="400"
              height="533"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Glow */}
        <div className="absolute inset-0 bg-(--color-accent) rounded-3xl blur-2xl opacity-20 -z-10" />
      </div>
    </div>
  );
};

export default ProfilePhoto;
