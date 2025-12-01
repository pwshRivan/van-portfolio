import { useThemeStore } from "@/store";

export function useTheme() {
  // Menggunakan selector pattern untuk mencegah re-render yang tidak perlu
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
}
