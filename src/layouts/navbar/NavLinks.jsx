import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { navLinks } from "@/data";

export default function NavLinks({
  activeSection,
  onNavigate,
  className = "",
}) {
  const { t } = useTranslation();

  return (
    <nav
      className={`items-center gap-1 absolute left-1/2 -translate-x-1/2 ${className}`}
    >
      {navLinks.map((link) => {
        const sectionId = link.path.replace("#", "");
        const isActive = activeSection === sectionId;

        return (
          <button
            key={link.path}
            onClick={() => onNavigate(sectionId)}
            className={`relative px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200 ease-out ${
              isActive
                ? "bg-(--color-accent) text-(--color-bg-primary) shadow-sm"
                : "text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-overlay)"
            }`}
            style={{
              willChange: isActive ? "auto" : "background-color, color",
            }}
            aria-label={`Navigate to ${t(link.name)}`}
            aria-current={isActive ? "page" : undefined}
          >
            {t(link.name)}
          </button>
        );
      })}
    </nav>
  );
}

NavLinks.propTypes = {
  activeSection: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  className: PropTypes.string,
};
