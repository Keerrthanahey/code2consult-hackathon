"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const subscribe = () => () => {};

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  const reducedMotion = useReducedMotion();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-foreground/15 bg-surface text-foreground transition-all duration-300 hover:border-green-dark/40 hover:bg-green-dark/10 hover:shadow-[0_0_22px_rgba(63,127,29,0.25)] active:scale-90"
    >
      {mounted && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={
              reducedMotion
                ? false
                : { rotate: -160, opacity: 0, scale: 0.5 }
            }
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={
              reducedMotion
                ? undefined
                : { rotate: 160, opacity: 0, scale: 0.5 }
            }
            transition={{ duration: 0.32, ease: "easeInOut" }}
            className="flex items-center justify-center text-green-dark"
          >
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}