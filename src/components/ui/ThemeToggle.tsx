import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/index";

const ThemeToggle = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full transition-all hover:scale-105 active:scale-95 focus:outline-none bg-(--color-overlay) text-(--color-text-primary) hover:bg-(--color-overlay-hover)"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
    >
      <div
        className="transition-transform duration-300"
        style={{ transform: isDark ? "rotate(0deg)" : "rotate(180deg)" }}
      >
        {isDark ? <Moon size={20} /> : <Sun size={20} />}
      </div>
    </button>
  );
};

export default ThemeToggle;
