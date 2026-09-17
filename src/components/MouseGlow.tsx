"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (coarse.matches || reduced.matches) return;

    const glow = glowRef.current;
    const ring = ringRef.current;
    if (!glow || !ring) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let interactive = false;
    let visible = false;
    let raf = 0;

    const onEnter = () => {
      visible = true;
    };
    const onLeave = () => {
      visible = false;
      interactive = false;
      ring.classList.remove("interactive");
    };
    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      visible = true;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const isInteractive = !!t?.closest(
        "a, button, [role='button'], input, textarea, select, [data-spotlight]"
      );
      interactive = isInteractive;
      if (isInteractive) {
        ring.classList.add("interactive");
      } else {
        ring.classList.remove("interactive");
      }
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;

      const scale = interactive ? 1.3 : 1;
      const x = currentX;
      const y = currentY;

      glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      glow.style.opacity = visible ? "1" : "0";
      ring.style.opacity = visible
        ? interactive
          ? "0.85"
          : "0.6"
        : "0";

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.documentElement.addEventListener("mouseleave", onLeave);

    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} aria-hidden="true" className="glow-disc" />
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" />
    </>
  );
}
