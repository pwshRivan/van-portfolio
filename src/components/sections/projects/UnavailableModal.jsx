import { memo } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { motion as Motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

const UnavailableModal = memo(({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return createPortal(
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={(e) => e.preventDefault()}
      onScroll={(e) => e.preventDefault()}
    >
      <Motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="max-w-md w-full rounded-2xl p-8 bg-(--color-bg-secondary) border border-(--color-border) text-center relative"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-(--color-overlay)">
          <ExternalLink size={32} className="text-(--color-text-secondary)" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-(--color-text-primary)">
          {t("projects.unavailable_title")}
        </h3>
        <p className="text-base mb-6 text-(--color-text-secondary) leading-relaxed">
          {t("projects.unavailable_desc")}
        </p>
        <button
          onClick={onClose}
          className="w-full px-6 py-3 rounded-full font-semibold transition-all bg-(--color-accent) text-(--color-bg-primary) hover:scale-105 active:scale-95"
        >
          {t("projects.close")}
        </button>
      </Motion.div>
    </Motion.div>,
    document.body
  );
});

UnavailableModal.displayName = "UnavailableModal";

UnavailableModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UnavailableModal;
