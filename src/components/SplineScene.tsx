"use client";

import { useRef, useEffect } from "react";
import { SPLINE_SCENE_URL } from "@/data/event";
import { GitPullRequest, Code2, Layers } from "lucide-react";

const faces = [
  { symbol: "{ }", accent: "accent-1", opacity: 0.6 },
  { symbol: "/>", accent: "accent-2", opacity: 0.65 },
  { symbol: "</>", accent: "accent-2", opacity: 0.55 },
  { symbol: "PR", accent: "accent-1", opacity: 0.6 },
  { symbol: "=>", accent: "accent-3", opacity: 0.7 },
  { symbol: "git", accent: "accent-2", opacity: 0.6 },
  { symbol: "→", accent: "accent-2", opacity: 0.65 },
  { symbol: "*", accent: "accent-1", opacity: 0.6 },
];

export default function SplineScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (SPLINE_SCENE_URL) return;

    let rotationX = 0;
    let rotationY = 0;
    let animFrame = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotationY = x * 24;
      rotationX = -y * 24;
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });

    const cubes = container.querySelectorAll(".hex-cube");
    let t = 0;

    const animate = () => {
      t += 0.004;
      cubes.forEach((c, i) => {
        const el = c as HTMLElement;
        const phase = i * 0.6;
        el.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY + t * 10 + phase}deg)`;
      });
      animFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  if (SPLINE_SCENE_URL) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      <div className="hex-cube relative h-[240px] w-[240px]" style={{ transformStyle: "preserve-3d" }}>
        {[0, 90, 180, 270].map((rotY, i) => (
          <div
            key={`side-${i}`}
            className="absolute flex items-center justify-center rounded-2xl border border-accent-1/20 bg-surface backdrop-blur-[2px]"
            style={{
              width: "240px",
              height: "240px",
              transform: `rotateY(${rotY}deg) translateZ(120px)`,
              backfaceVisibility: "hidden",
              boxShadow: "inset 0 0 60px rgba(63,127,29,0.06)",
            }}
          >
            <span
              className="font-mono text-6xl font-bold"
              style={{
                color: `var(--${faces[i].accent})`,
                opacity: faces[i].opacity,
              }}
            >
              {faces[i].symbol}
            </span>
          </div>
        ))}
        <div
          className="absolute flex flex-col items-center justify-center gap-2 rounded-2xl border border-accent-1/20 bg-surface"
          style={{
            width: "240px",
            height: "240px",
            transform: "rotateX(90deg) translateZ(120px)",
            backfaceVisibility: "hidden",
          }}
        >
          <GitPullRequest size={44} className="text-accent-1/40" />
          <span className="font-mono text-xs tracking-widest text-accent-1/50">
            IMPROVE
          </span>
        </div>
        <div
          className="absolute flex flex-col items-center justify-center gap-2 rounded-2xl border border-accent-2/20 bg-surface"
          style={{
            width: "240px",
            height: "240px",
            transform: "rotateX(-90deg) translateZ(120px)",
            backfaceVisibility: "hidden",
          }}
        >
          <Layers size={44} className="text-accent-2/40" />
          <span className="font-mono text-xs tracking-widest text-accent-2/50">
            SCALE
          </span>
        </div>
      </div>

      <div className="absolute flex items-center justify-center">
        <div className="h-[280px] w-[280px] rounded-full bg-accent-1/[0.08] blur-[70px]" />
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-foreground/10 bg-surface px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-foreground/40">
        <Code2 size={12} className="text-accent-1/60" />
        OPEN-SOURCE SYSTEMS
      </div>
    </div>
  );
}