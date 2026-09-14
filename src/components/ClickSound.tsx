"use client";

import { useEffect } from "react";
import { playClickSound } from "@/lib/sfx";

const SELECTOR =
  "a[href], button, [role='button'], summary, input, select, textarea, [data-click-sound]";

export default function ClickSound() {
  useEffect(() => {
    let lastTarget: Element | null = null;
    let lastTime = 0;

    const fire = (target: EventTarget | null) => {
      const el = target instanceof Element ? target.closest(SELECTOR) : null;
      if (!el) return;
      const now = performance.now();
      if (el === lastTarget && now - lastTime < 100) return;
      lastTarget = el;
      lastTime = now;
      playClickSound();
    };

    const onPointerDown = (e: PointerEvent) => fire(e.target);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      fire(e.target);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  return null;
}