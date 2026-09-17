"use client";

import { useEffect } from "react";
import { playClickSound } from "@/lib/sound";

const SELECTOR =
  "a[href], button, [role='button'], summary, input[type='submit'], input[type='button'], select, textarea, [data-click-sound]";

export default function ClickSound() {
  useEffect(() => {
    let lastTarget: Element | null = null;
    let lastTime = 0;

    const fire = (target: EventTarget | null) => {
      const el = target instanceof Element ? target.closest(SELECTOR) : null;
      if (!el) return;
      const now = performance.now();
      if (el === lastTarget && now - lastTime < 80) return; // Debounce: 80ms
      lastTarget = el;
      lastTime = now;
      playClickSound(); // LOUD, AUDIBLE sound
    };

    const onPointerDown = (e: PointerEvent) => fire(e.target);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      fire(e.target);
    };

    // Capture phase to catch all clicks
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  return null;
}
