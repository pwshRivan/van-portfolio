import PropTypes from "prop-types";
import { useSmoothScroll } from "@/hooks";
import { cn } from "@/utils";

const HeroActions = ({ t, className }) => {
  const { scrollToSection } = useSmoothScroll();

  const handleScroll = (sectionId) => (e) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <div
      className={cn("flex flex-col sm:flex-row items-center gap-6", className)}
    >
      <div className="flex items-center gap-4">
        <a
          href="#contact"
          onClick={handleScroll("contact")}
          className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-(--color-accent) text-(--color-bg-primary) rounded-full hover:opacity-90 transition-all duration-300 font-semibold tracking-wide shadow-lg shadow-(--color-accent)/20 hover:shadow-(--color-accent)/40 hover:-translate-y-1 overflow-hidden"
        >
          <span className="relative z-10">{t("hero.cta_primary")}</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </a>

        <a
          href="#projects"
          onClick={handleScroll("projects")}
          className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-(--color-border) text-(--color-text-primary) rounded-full hover:bg-(--color-bg-secondary) transition-all duration-300 font-semibold tracking-wide hover:-translate-y-1"
        >
          {t("hero.cta_secondary")}
        </a>
      </div>
    </div>
  );
};

HeroActions.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default HeroActions;
