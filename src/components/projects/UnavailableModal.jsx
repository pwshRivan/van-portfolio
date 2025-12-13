import { memo, useRef } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui";

const UnavailableModal = memo(({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);

  useGSAP(
    () => {
      if (isOpen) {
        gsap.from(".modal-overlay", {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.from(".modal-content", {
          scale: 0.9,
          y: 20,
          opacity: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
          delay: 0.1,
        });
      }
    },
    { scope: modalRef, dependencies: [isOpen] }
  );

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={modalRef}
      className="modal-overlay fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={(e) => e.preventDefault()}
      onScroll={(e) => e.preventDefault()}
    >
      <div
        className="modal-content max-w-md w-full rounded-2xl p-8 bg-(--color-bg-secondary) border border-(--color-border) text-center relative"
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
        <Button
          onClick={onClose}
          className="w-full rounded-full font-semibold transition-all hover:scale-105 active:scale-95 border-none"
        >
          {t("projects.close")}
        </Button>
      </div>
    </div>,
    document.body
  );
});

UnavailableModal.displayName = "UnavailableModal";

UnavailableModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UnavailableModal;
