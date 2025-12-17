import { useState, useEffect, useCallback, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "./contexts";
import { storage } from "../utils";

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<string>(
    () => storage.get("language", "id") as string
  );

  const setLanguage = useCallback(
    (newLang: string) => {
      setLanguageState(newLang);
      storage.set("language", newLang);
      i18n.changeLanguage(newLang);
    },
    [i18n]
  );

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "id" : "en");
  }, [language, setLanguage]);

  // Sync with i18n on mount
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isIndonesian: language === "id",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
