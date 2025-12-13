import { useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ProfilePhoto = ({ src, alt, className = "" }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(".profile-container", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

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

ProfilePhoto.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ProfilePhoto;
