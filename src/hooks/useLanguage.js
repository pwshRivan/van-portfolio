import { useLanguageStore } from "@/store";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export function useLanguage() {
  const { i18n } = useTranslation();

  // Using selector pattern to prevent unnecessary re-renders
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  // Sync Zustand state with i18next
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  // Custom toggle that also updates i18next
  const handleToggleLanguage = () => {
    const newLang = language === "en" ? "id" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  // Custom setLanguage that also updates i18next
  const handleSetLanguage = (newLang) => {
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return {
    language,
    toggleLanguage: handleToggleLanguage,
    setLanguage: handleSetLanguage,
    isEnglish: language === "en",
    isIndonesian: language === "id",
  };
}
