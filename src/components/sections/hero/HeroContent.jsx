import PropTypes from "prop-types";
import { cn } from "@/utils";

const HeroContent = ({ t, typedName, className }) => {
  return (
    <div
      className={cn(
        "w-full max-w-360 flex flex-col items-center gap-6 md:gap-8",
        className
      )}
    >
      {/* 1. Intro Small Text */}
      <div className="hero-text-reveal overflow-hidden">
        <p className="hero-intro font-mono text-(--color-accent) text-sm md:text-lg tracking-[0.2em] uppercase font-bold">
          {t("hero.title_1")}
        </p>
      </div>

      {/* 2. Name - Massive & Typing Effect */}
      <div className="relative w-full min-h-20 sm:min-h-24 md:min-h-32 flex items-center justify-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-(--color-text-primary) whitespace-nowrap overflow-visible">
          <span>{typedName}</span>
          <span className="animate-pulse text-(--color-accent) inline-block ml-1">
            |
          </span>
        </h1>
      </div>

      {/* 3. Description Paragraph */}
      <div className="hero-text-reveal overflow-hidden max-w-2xl mt-2">
        <p className="hero-desc text-base md:text-xl text-(--color-text-secondary) leading-relaxed font-medium">
          {t("hero.description")}
        </p>
      </div>
    </div>
  );
};

HeroContent.propTypes = {
  t: PropTypes.func.isRequired,
  typedName: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default HeroContent;
