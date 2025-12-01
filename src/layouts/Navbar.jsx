import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useLanguage } from "@/hooks";
import { ThemeToggle } from "@/components";
import { navLinks } from "@/data";
import vanPhoto from "@/assets/images/van.jpg";

function NavBrand({ onNavigate }) {


  return (
    <div className="flex items-center">
      <button
        onClick={() => onNavigate("home")}
        className="group relative"
        aria-label="Go to home"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-(--color-border)">
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

          {/* Name */}
          <span className="font-semibold whitespace-nowrap text-(--color-text-primary)">
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

function NavLinks({ activeSection, onNavigate, className = "" }) {
  const { t } = useTranslation();

  return (
    <nav
      className={`items-center gap-1 absolute left-1/2 -translate-x-1/2 ${className}`}
    >
      {navLinks.map((link) => {
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

      {/* Menu Content */}
      <div className="relative h-full flex items-center justify-center p-8">
        <nav className="w-full max-w-md">
          {/* Navigation Links */}
          <div className="space-y-3">
            {navLinks.map((link) => {
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

        {/* Close Button */}
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

import { useNavigationStore } from "@/store";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeSection, setActiveSection } = useNavigationStore();
  const [scrolled, setScrolled] = useState(false);
  const lenisInstanceRef = useRef(null);

  // Mengambil instance Lenis menggunakan ref untuk menghindari re-render yang tidak perlu
  useEffect(() => {
    lenisInstanceRef.current = window.lenis;
  }, []);

  // Memantau section yang aktif saat scroll
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Cek apakah sudah scroll melewati threshold tertentu
          setScrolled(lastScrollY > 50);

          // Menentukan section aktif berdasarkan tinggi yang terlihat di viewport
          const sections = navLinks.map((link) => link.path.substring(1));
          let maxVisibleHeight = 0;
          let bestSection = null;

          sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              const viewportHeight = window.innerHeight;
              
              // Hitung tinggi elemen yang terlihat di layar
              const visibleHeight = Math.max(
                0,
                Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
              );

              // Update jika section ini lebih mendominasi tampilan
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
    // Dengarkan event scroll dari Lenis jika tersedia
    if (window.lenis) {
      window.lenis.on('scroll', handleScroll);
    }
    
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (window.lenis) {
        window.lenis.off('scroll', handleScroll);
      }
    };
  }, [activeSection, setActiveSection]);

  // Fungsi smooth scroll ke section tujuan
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    // Gunakan Lenis untuk smooth scroll jika tersedia
    const lenis = lenisInstanceRef.current;
    if (lenis) {
      lenis.scrollTo(element, {
        offset: -100,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      // Fallback ke native smooth scroll
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Set active section segera untuk feedback instan
    setActiveSection(sectionId);
  }, [setActiveSection]);

  // Handle klik navigasi
  const handleNavClick = useCallback(
    (sectionId) => {
      scrollToSection(sectionId);
      setMobileMenuOpen(false);
    },
    [scrollToSection]
  );

  // Toggle menu mobile
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  // Tutup menu mobile
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Mencegah scroll pada body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-4">
        <div className="container mx-auto px-6">
          <div
            className={`relative flex items-center px-6 py-3 rounded-full transition-all duration-300 border ${
              scrolled
                ? "border-(--color-border) bg-(--color-bg-primary)/95 shadow-sm"
                : "border-transparent bg-(--color-bg-primary)/80"
            }`}
          >
            {/* Brand */}
            <NavBrand onNavigate={handleNavClick} />

            {/* Desktop Nav */}
            <NavLinks
              activeSection={activeSection}
              onNavigate={handleNavClick}
              className="hidden lg:flex"
            />

            {/* Actions */}
            <div className="ml-auto flex items-center gap-2">
              <NavActions />

              {/* Mobile Toggle */}
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
