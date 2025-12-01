import { useLanguageStore } from "@/store";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export function useLanguage() {
  const { i18n } = useTranslation();

  // Menggunakan selector pattern untuk mencegah re-render yang tidak perlu
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  // Sinkronisasi state Zustand dengan i18next
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  // Toggle custom yang juga mengupdate i18next
  const handleToggleLanguage = () => {
    const newLang = language === "en" ? "id" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  // SetLanguage custom yang juga mengupdate i18next
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
