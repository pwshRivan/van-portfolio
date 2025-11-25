import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set, get) => ({
      // State
      theme:
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",

      // Actions
      toggleTheme: () => {
        const newTheme = get().theme === "dark" ? "light" : "dark";
        set({ theme: newTheme });

        // Update DOM
        if (typeof window !== "undefined") {
          const root = window.document.documentElement;
          root.setAttribute("data-theme", newTheme);
        }
      },

      setTheme: (theme) => {
        set({ theme });
        if (typeof window !== "undefined") {
          const root = window.document.documentElement;
          root.setAttribute("data-theme", theme);
        }
      },
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
);

// Initialize theme on load
if (typeof window !== "undefined") {
  const initialTheme = useThemeStore.getState().theme;
  document.documentElement.setAttribute("data-theme", initialTheme);
}

export default useThemeStore;
