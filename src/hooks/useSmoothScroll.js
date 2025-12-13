import { useCallback } from "react";
import { useNavigationStore } from "@/store";

export const useSmoothScroll = () => {
  const { setActiveSection } = useNavigationStore();

  const scrollToSection = useCallback(
    (sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      setActiveSection(sectionId);

      if (window.lenis) {
        window.lenis.scrollTo(element, {
          offset: -50,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [setActiveSection]
  );

  return { scrollToSection };
};
