import PropTypes from "prop-types";
import { X, Menu } from "lucide-react";

export default function MenuToggle({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`lg:hidden relative z-70 w-12 h-12 flex flex-col justify-center items-end gap-[5px] group p-2 transition-transform duration-200 ease-out ${
        isOpen ? "rotate-180" : ""
      }`}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <span
        className={`h-[2px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] origin-right ${
          isOpen ? "w-6 -rotate-45 -translate-y-px -translate-x-[4px]" : "w-6"
        } ${
          isOpen
            ? "text-(--color-text-primary)"
            : "text-(--color-text-secondary)"
        }`}
      />
      <span
        className={`h-[2px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] ${
          isOpen ? "w-0 opacity-0" : "w-4"
        } ${
          isOpen
            ? "text-(--color-text-primary)"
            : "text-(--color-text-secondary)"
        }`}
      />
      <span
        className={`h-[2px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] origin-right ${
          isOpen ? "w-6 rotate-45 translate-y-px -translate-x-[4px]" : "w-2"
        } ${
          isOpen
            ? "text-(--color-text-primary)"
            : "text-(--color-text-secondary)"
        }`}
      />
    </button>
  );
}

MenuToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
