import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage, useScrollLock } from "@/hooks/index";
import { smoothScrollTo } from "@/utils/index";
import { contactData, navLinks } from "@/data/index";
import { ThemeToggle } from "@/components/ui/index";
import MobileMenu from "@/layouts/MobileNavbar";
import ppVan from "@/assets/images/ppvan.jpg";

interface NavBrandProps {
  onNavigate: (sectionId: string) => void;
}

const NavBrand = ({ onNavigate }: NavBrandProps) => (
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

interface NavLinksProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  className?: string;
}

const NavLinks = ({ activeSection, onNavigate, className }: NavLinksProps) => {
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

interface MenuToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const MenuToggle = ({ isOpen, onClick }: MenuToggleProps) => (
  <button
    onClick={onClick}
    className="p-2 lg:hidden rounded-full hover:bg-(--color-overlay-hover) transition-colors text-(--color-text-primary)"
    aria-label="Toggle menu"
  >
    {isOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);

          const sections = navLinks.map((link) => link.path.substring(1));
          let maxVisibleHeight = 0;
          let bestSection: string | null = null;
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
    if (
      (
        window as unknown as {
          lenis?: { on: (event: string, handler: () => void) => void };
        }
      ).lenis
    ) {
      (
        window as unknown as {
          lenis: { on: (event: string, handler: () => void) => void };
        }
      ).lenis.on("scroll", handleScroll);
    }

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (
        (
          window as unknown as {
            lenis?: { off: (event: string, handler: () => void) => void };
          }
        ).lenis
      ) {
        (
          window as unknown as {
            lenis: { off: (event: string, handler: () => void) => void };
          }
        ).lenis.off("scroll", handleScroll);
      }
    };
  }, [activeSection]);

  const handleNavClick = useCallback((sectionId: string) => {
    smoothScrollTo(sectionId, 80);
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useScrollLock(mobileMenuOpen);

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
