"use client";

import { useEffect, useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  // Helps native UI (forms/scrollbars) match the theme.
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? null;
    const initial = saved === "light" || saved === "dark" ? saved : getSystemTheme();
    applyTheme(initial);
    setTheme(initial);
  }, []);

  const next = useMemo<Theme | null>(() => {
    if (!theme) return null;
    return theme === "dark" ? "light" : "dark";
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => {
        if (!next) return;
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
        setTheme(next);
      }}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 44,
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border)",
        background: "var(--card)",
        color: "var(--text-primary)",
        cursor: "pointer",
      }}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

