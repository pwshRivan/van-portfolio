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
          if (newTheme === "dark") {
            root.classList.add("dark");
          } else {
            root.classList.remove("dark");
          }
        }
      },

      setTheme: (theme) => {
        set({ theme });
        if (typeof window !== "undefined") {
          const root = window.document.documentElement;
          root.setAttribute("data-theme", theme);
          if (theme === "dark") {
            root.classList.add("dark");
          } else {
            root.classList.remove("dark");
          }
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

// Inisialisasi tema saat load
if (typeof window !== "undefined") {
  const initialTheme = useThemeStore.getState().theme;
  const root = document.documentElement;
  root.setAttribute("data-theme", initialTheme);
  if (initialTheme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export default useThemeStore;
