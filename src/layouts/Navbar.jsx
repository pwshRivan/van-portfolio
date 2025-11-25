import { useState, useEffect, useCallback } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Lenis from "lenis";
import { useLanguage } from "@/hooks";
import { ThemeToggle } from "@/components";
import { NAV_LINKS } from "@/data/portfolioData";
import vanPhoto from "@/assets/images/van.jpg";

/**
 * Navigation Brand Component
 */
function NavBrand({ onNavigate }) {
  const [showName, setShowName] = useState(false);

  return (
    <div className="flex items-center">
      <button
        onClick={() => onNavigate("home")}
        className="group relative"
        onMouseEnter={() => setShowName(true)}
        onMouseLeave={() => setShowName(false)}
        aria-label="Go to home"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 transition-all border-(--color-border) group-hover:border-(--color-accent)">
              <img
                src={vanPhoto}
                alt="M Rivan Sahronie"
                width="40"
                height="40"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Name - Show on Hover */}
          {showName && (
            <span className="font-semibold whitespace-nowrap text-(--color-text-primary) animate-fade-in">
              M Rivan Sahronie
            </span>
          )}
        </div>
      </button>
    </div>
  );
}

NavBrand.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

/**
 * Navigation Links Component
 */
function NavLinks({ activeSection, onNavigate, className = "" }) {
  const { t } = useTranslation();

  return (
    <nav
      className={`items-center gap-1 absolute left-1/2 -translate-x-1/2 ${className}`}
    >
      {NAV_LINKS.map((link) => {
        const sectionId = link.path.replace("#", "");
        const isActive = activeSection === sectionId;

        return (
          <button
            key={link.path}
            onClick={() => onNavigate(sectionId)}
            className={`relative px-3 py-2 rounded-full text-xs font-semibold transition-all duration-300 ease-in-out ${
              isActive
                ? "bg-(--color-accent) text-(--color-bg-primary)"
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

/**
 * Navigation Actions Component
 */
function NavActions() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <>
      {/* Desktop Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full transition-all hover:scale-105 active:scale-95 bg-(--color-overlay) hover:bg-(--color-overlay-hover)"
        aria-label={`Switch to ${language === "en" ? "Indonesian" : "English"}`}
      >
        <Globe size={14} className="text-(--color-text-secondary)" />
        <span className="text-xs font-semibold text-(--color-text-secondary)">
          {language.toUpperCase()}
        </span>
      </button>

      {/* Mobile Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="md:hidden px-2.5 py-2 rounded-full transition-all hover:scale-105 active:scale-95 bg-(--color-overlay) hover:bg-(--color-overlay-hover)"
        aria-label={`Switch to ${language === "en" ? "Indonesian" : "English"}`}
      >
        <span className="text-xs font-semibold text-(--color-text-secondary)">
          {language.toUpperCase()}
        </span>
      </button>

      {/* Theme Toggle */}
      <ThemeToggle />
    </>
  );
}

/**
 * Mobile Menu Component
 */
function MobileMenu({ isOpen, activeSection, onNavigate, onClose }) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 lg:hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-(--color-bg-primary) bg-opacity-98"
        onClick={onClose}
      />

      {/* Menu Content - Centered */}
      <div className="relative h-full flex items-center justify-center p-8">
        <nav className="w-full max-w-md">
          {/* Navigation Links */}
          <div className="space-y-3">
            {NAV_LINKS.map((link) => {
              const sectionId = link.path.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <button
                  key={link.path}
                  onClick={() => onNavigate(sectionId)}
                  className={`w-full text-center px-8 py-5 rounded-2xl transition-all duration-200 ${
                    isActive
                      ? "bg-(--color-accent) text-(--color-bg-primary)"
                      : "bg-(--color-surface) text-(--color-text-primary) hover:bg-(--color-surface-hover) border border-(--color-border)"
                  }`}
                  aria-label={`Navigate to ${t(link.name)}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="text-xl font-bold tracking-wide">
                    {t(link.name)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <div className="text-sm text-(--color-text-tertiary)">
              {new Date().getFullYear()} © M Rivan Sahronie
            </div>
          </div>
        </nav>

        {/* Close Button - Top Right */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 p-4 rounded-full transition-all hover:scale-105 active:scale-95 bg-(--color-surface) hover:bg-(--color-surface-hover) border border-(--color-border)"
          aria-label="Close menu"
        >
          <X size={24} className="text-(--color-text-primary)" />
        </button>
      </div>
    </div>
  );
}

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  activeSection: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

/**
 * Main Navbar Component
 * Responsive navigation bar with smooth animations
 *
 * Features:
 * - Sticky header
 * - Active section detection
 * - Mobile menu
 * - Theme & language toggle
 * - Smooth scroll navigation
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [lenisInstance, setLenisInstance] = useState(null);

  // Get Lenis instance
  useEffect(() => {
    const lenis = window.lenis;
    if (lenis) {
      setLenisInstance(lenis);
    }
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Check if scrolled past threshold
          setScrolled(lastScrollY > 50);
          ticking = false;
        });

        ticking = true;
      }
    };

    // Use Intersection Observer for active section
    const observerOptions = {
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0, 0.25, 0.5],
    };

    const observer = new IntersectionObserver((entries) => {
      // Get all intersecting sections
      const intersectingSections = [];

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectingSections.push({
            id: entry.target.id,
            top: entry.boundingClientRect.top,
            ratio: entry.intersectionRatio,
          });
        }
      });

      // Sort by position (topmost visible section wins)
      intersectingSections.sort((a, b) => a.top - b.top);

      // Update active section
      if (intersectingSections.length > 0) {
        const newSection = intersectingSections[0].id;
        setActiveSection((prev) => {
          // Only update if different to prevent unnecessary re-renders
          return prev !== newSection ? newSection : prev;
        });
      }
    }, observerOptions);

    // Observe all sections
    const sections = NAV_LINKS.map((link) => link.path.substring(1));
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Smooth scroll to section using Lenis
  const scrollToSection = useCallback(
    (sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      // Use Lenis for smooth scroll if available
      if (lenisInstance) {
        lenisInstance.scrollTo(element, {
          offset: -100,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        // Fallback to native smooth scroll
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Immediately set active section for instant feedback
      setActiveSection(sectionId);
    },
    [lenisInstance]
  );

  // Handle navigation click
  const handleNavClick = useCallback(
    (sectionId) => {
      scrollToSection(sectionId);
      setMobileMenuOpen(false);
    },
    [scrollToSection]
  );

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-4 opacity-0 animate-fade-in">
        <div className="container mx-auto px-6">
          <div
            className={`relative flex items-center px-6 py-3 rounded-full transition-all duration-300 border ${
              scrolled
                ? "border-(--color-border) bg-(--color-bg-primary)/95"
                : "border-(--color-border) bg-(--color-bg-primary)/90"
            }`}
          >
            {/* Brand */}
            <NavBrand onNavigate={handleNavClick} />

            {/* Desktop Navigation */}
            <NavLinks
              activeSection={activeSection}
              onNavigate={handleNavClick}
              className="hidden lg:flex"
            />

            {/* Actions */}
            <div className="ml-auto flex items-center gap-2">
              <NavActions />

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden px-2.5 py-2 rounded-full transition-all hover:scale-105 active:scale-95 bg-(--color-overlay) hover:bg-(--color-overlay-hover)"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X size={18} className="text-(--color-text-secondary)" />
                ) : (
                  <Menu size={18} className="text-(--color-text-secondary)" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        activeSection={activeSection}
        onNavigate={handleNavClick}
        onClose={closeMobileMenu}
      />
    </>
  );
}
