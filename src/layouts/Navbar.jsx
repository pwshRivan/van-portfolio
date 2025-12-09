import { useState, useEffect, useCallback, useRef } from "react";
import { navLinks } from "@/data";
import { useNavigationStore } from "@/store";
import {
  MenuToggle,
  NavBrand,
  NavLinks,
  NavActions,
  MobileMenu,
} from "./navbar/index";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeSection, setActiveSection } = useNavigationStore();
  const [scrolled, setScrolled] = useState(false);
  const lenisInstanceRef = useRef(null);

  useEffect(() => {
    lenisInstanceRef.current = window.lenis;
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);

          const sections = navLinks.map((link) => link.path.substring(1));
          let maxVisibleHeight = 0;
          let bestSection = null;
          const viewportHeight = window.innerHeight;

          sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();

              if (rect.bottom < 0 || rect.top > viewportHeight) return;

              const visibleHeight = Math.max(
                0,
                Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
              );

              if (visibleHeight > maxVisibleHeight) {
                maxVisibleHeight = visibleHeight;
                bestSection = sectionId;
              }
            }
          });

          if (bestSection && bestSection !== activeSection) {
            setActiveSection(bestSection);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    if (window.lenis) {
      window.lenis.on("scroll", handleScroll);
    }

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (window.lenis) {
        window.lenis.off("scroll", handleScroll);
      }
    };
  }, [activeSection, setActiveSection]);

  const scrollToSection = useCallback(
    (sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const lenis = lenisInstanceRef.current;
      if (lenis) {
        lenis.scrollTo(element, {
          offset: -100,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      setActiveSection(sectionId);
    },
    [setActiveSection]
  );

  const handleNavClick = useCallback(
    (sectionId) => {
      scrollToSection(sectionId);
      setMobileMenuOpen(false);
    },
    [scrollToSection]
  );

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = mobileMenuOpen ? "hidden" : originalStyle;
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-4 pointer-events-none">
        <div className="container mx-auto px-6 pointer-events-auto">
          <div
            className={`relative flex items-center px-6 py-3 rounded-full transition-all duration-300 border ${
              scrolled
                ? "border-(--color-border) bg-(--color-bg-primary)/95 shadow-sm backdrop-blur-md"
                : "border-transparent bg-(--color-bg-primary)/80 backdrop-blur-sm"
            }`}
          >
            <NavBrand onNavigate={handleNavClick} />

            <NavLinks
              activeSection={activeSection}
              onNavigate={handleNavClick}
              className="hidden lg:flex"
            />

            <div className="ml-auto flex items-center gap-2">
              <NavActions />

              <MenuToggle isOpen={mobileMenuOpen} onClick={toggleMobileMenu} />
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        activeSection={activeSection}
        onNavigate={handleNavClick}
        onClose={closeMobileMenu}
      />
    </>
  );
}
