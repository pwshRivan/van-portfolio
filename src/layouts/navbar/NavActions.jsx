import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks";
import { ThemeToggle } from "@/components";

export default function NavActions() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <>
      {/* Desktop Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 bg-(--color-overlay) hover:bg-(--color-overlay-hover) cursor-pointer"
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
        className="md:hidden px-2.5 py-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 bg-(--color-overlay) hover:bg-(--color-overlay-hover) cursor-pointer"
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
