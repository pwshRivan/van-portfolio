import { memo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { animate } from "animejs";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui";

interface UnavailableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UnavailableModal = memo(({ isOpen, onClose }: UnavailableModalProps) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<ReturnType<typeof animate>[]>([]);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    animationsRef.current = [];

    const overlay = modalRef.current.querySelector(".modal-overlay");
    const content = modalRef.current.querySelector(".modal-content");

    if (overlay) {
      const overlayAnim = animate(overlay, {
        opacity: [0, 1],
        duration: 300,
        ease: "outQuad",
      });
      animationsRef.current.push(overlayAnim);
    }

    if (content) {
      const contentAnim = animate(content, {
        scale: [0.9, 1],
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 400,
        delay: 100,
        ease: "outBack",
      });
      animationsRef.current.push(contentAnim);
    }

    return () => {
      animationsRef.current.forEach((anim) => {
        if (anim && "revert" in anim) {
          anim.revert();
        }
      });
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return createPortal(
    <div
      ref={modalRef}
      className="modal-overlay fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={(e) => e.preventDefault()}
    >
      <div className="modal-content max-w-md w-full rounded-2xl p-8 bg-(--color-bg-secondary) border border-(--color-border) text-center relative">
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

export default UnavailableModal;
