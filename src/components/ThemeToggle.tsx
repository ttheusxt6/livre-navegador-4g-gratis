
import React from "react";
import { Palette, Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system";
    }
    return "system";
  });

  React.useEffect(() => {
    if (theme === "system") {
      document.documentElement.classList.remove("dark");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      }
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex gap-2 items-center font-semibold pr-2">
      <span className="text-xs text-gray-500">Tema</span>
      <button
        aria-label="Tema Claro"
        className={`p-1 rounded ${theme === "light" ? "bg-gray-200" : ""}`}
        onClick={() => setTheme("light")}
      >
        <Sun size={18} className={theme === "light" ? "text-vpn-blue" : "text-gray-500"} />
      </button>
      <button
        aria-label="Tema Escuro"
        className={`p-1 rounded ${theme === "dark" ? "bg-gray-900" : ""}`}
        onClick={() => setTheme("dark")}
      >
        <Moon size={18} className={theme === "dark" ? "text-yellow-400" : "text-gray-500"} />
      </button>
      <button
        aria-label="Tema Automático"
        className={`p-1 rounded ${theme === "system" ? "bg-gray-300" : ""}`}
        onClick={() => setTheme("system")}
      >
        <Palette size={18} className={theme === "system" ? "text-vpn-green" : "text-gray-500"} />
      </button>
    </div>
  );
};

export default ThemeToggle;
