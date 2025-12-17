import { createContext } from "react";

export interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

export interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  toggleLanguage: () => void;
  isIndonesian: boolean;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
export const LanguageContext = createContext<LanguageContextType | null>(null);
