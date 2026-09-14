"use client";

import { ThemeProvider } from "next-themes";
import ClickSound from "@/components/ClickSound";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      storageKey="c2c-theme"
    >
      <ClickSound />
      {children}
    </ThemeProvider>
  );
}