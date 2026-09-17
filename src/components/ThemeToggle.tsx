"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // CRITICAL: Return the exact same HTML on server and client initially
  // Only after mounting can we render theme-dependent content
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        title="Toggle theme"
        className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-neon-cyan/30 transition-all"
      >
        {/* Neutral placeholder - same on both server and client */}
        <Sun className="h-5 w-5 text-neon-cyan" />
      </button>
    );
  }

  // After mount, safe to use theme state
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-neon-cyan/30 transition-all duration-300 hover:border-neon-cyan hover:shadow-[0_0_12px_rgba(0,245,255,0.3)]"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-neon-cyan transition-transform" />
      ) : (
        <Moon className="h-5 w-5 text-neon-cyan transition-transform" />
      )}
    </button>
  );
}
