import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe } from "lucide-react";
import { useNavigationStore } from "@/store";
import { useLanguage, useSmoothScroll } from "@/hooks";
import { contactData, navLinks } from "@/data";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileMenu from "@/layouts/MobileNavbar";
import ppVan from "@/assets/images/ppvan.jpg";

const NavBrand = ({ onNavigate }) => (
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
              src={ppVan}
              alt={contactData.name}
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
        <span className="font-semibold whitespace-nowrap text-(--color-text-primary) transition-colors duration-200 group-hover:text-(--color-accent)">
          {contactData.name}
        </span>
      </div>
    </button>
  </div>
);
NavBrand.propTypes = { onNavigate: PropTypes.func.isRequired };

const NavLinks = ({ activeSection, onNavigate, className }) => {
  const { t } = useTranslation();
  return (
    <nav className={`flex items-center gap-1 ${className}`}>
      {navLinks.map((link) => {
        const sectionId = link.path.substring(1);
        const isActive = activeSection === sectionId;
        return (
          <button
            key={link.path}
            onClick={() => onNavigate(sectionId)}
            className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              isActive
                ? "bg-(--color-text-primary) text-(--color-bg-primary) shadow-sm"
                : "text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-overlay-hover)"
            }`}
          >
            {t(link.name)}
          </button>
        );
      })}
    </nav>
  );
};
NavLinks.propTypes = {
  activeSection: PropTypes.string,
  onNavigate: PropTypes.func,
  className: PropTypes.string,
};

const LanguageSwitch = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-(--color-overlay-hover) transition-all duration-200 text-xs font-medium text-(--color-text-primary) cursor-pointer active:scale-95"
      aria-label={`Switch to ${language === "en" ? "Indonesian" : "English"}`}
    >
      <Globe size={16} className="text-(--color-text-secondary)" />
      <span>{language.substring(0, 2).toUpperCase()}</span>
    </button>
  );
};

const NavActions = () => {
  return (
    <div className="flex items-center gap-2 pl-2 border-l border-(--color-border) ml-2">
      <LanguageSwitch />
      <ThemeToggle />
    </div>
  );
};

const MenuToggle = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="p-2 lg:hidden rounded-full hover:bg-(--color-overlay-hover) transition-colors text-(--color-text-primary)"
    aria-label="Toggle menu"
  >
    {isOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
);
MenuToggle.propTypes = { isOpen: PropTypes.bool, onClick: PropTypes.func };

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeSection, setActiveSection } = useNavigationStore();
  const [scrolled, setScrolled] = useState(false);
  const { scrollToSection } = useSmoothScroll();

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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-6"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="transition-all duration-300">
            <NavBrand onNavigate={handleNavClick} />
          </div>

          <div
            className={`hidden lg:flex items-center bg-(--color-surface) backdrop-blur-xl border border-(--color-border) rounded-full p-1.5 shadow-sm transition-all duration-300 ${
              scrolled ? "shadow-md" : ""
            }`}
          >
            <NavLinks
              activeSection={activeSection}
              onNavigate={handleNavClick}
              className="bg-transparent! border-none! p-0!"
            />

            <NavActions />
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitch />
            <ThemeToggle />
            <MenuToggle isOpen={mobileMenuOpen} onClick={toggleMobileMenu} />
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
