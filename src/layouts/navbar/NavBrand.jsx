import PropTypes from "prop-types";
import vanPhoto from "@/assets/images/van.jpg";

export default function NavBrand({ onNavigate }) {
  return (
    <div className="flex items-center">
      <button
        onClick={() => onNavigate("home")}
        className="group relative"
        aria-label="Go to home"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-(--color-border) shadow-sm">
              <img
                src={vanPhoto}
                alt="M Rivan Sahronie"
                width="40"
                height="40"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Name */}
          <span className="font-semibold whitespace-nowrap text-(--color-text-primary) transition-colors duration-200 group-hover:text-(--color-accent)">
            M Rivan Sahronie
          </span>
        </div>
      </button>
    </div>
  );
}

NavBrand.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};
