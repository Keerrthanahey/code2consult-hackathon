"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SPLINE_SCENE_URL } from "@/data/event";
import { GitPullRequest, Code2, Layers } from "lucide-react";
import { playClickSound } from "@/lib/sound";

const faces = [
  { symbol: "{ }", accent: "accent-1", opacity: 0.6 },
  { symbol: "/>", accent: "accent-2", opacity: 0.65 },
  { symbol: "</>", accent: "accent-2", opacity: 0.55 },
  { symbol: "PR", accent: "accent-1", opacity: 0.6 },
  { symbol: "=>", accent: "accent-3", opacity: 0.7 },
  { symbol: "git", accent: "accent-2", opacity: 0.6 },
];

interface CubeState {
  isHovered: boolean;
  isDragging: boolean;
  scale: number;
  glowIntensity: number;
}

export default function InteractiveCube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CubeState>({
    isHovered: false,
    isDragging: false,
    scale: 1,
    glowIntensity: 0.5,
  });

  // Motion values for smooth rotations
  const rotationX = useMotionValue(0);
  const rotationY = useMotionValue(0);
  const sprX = useSpring(rotationX, { damping: 30, mass: 1, stiffness: 100 });
  const sprY = useSpring(rotationY, { damping: 30, mass: 1, stiffness: 100 });

  // Momentum tracking for drag
  const dragMomentumX = useRef(0);
  const dragMomentumY = useRef(0);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  let idleAnimFrame = 0;
  let dragAnimFrame = 0;

  useEffect(() => {
    const container = containerRef.current;
    const cube = cubeRef.current;
    if (!container || !cube || SPLINE_SCENE_URL) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let isDragging = false;
    let idleRotation = 0;
    let hoveredOverCube = false;

    // MOUSE MOVE TRACKING
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) return; // Don't update on mouse move while dragging

      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate distance from center
      const distX = (x - centerX) / centerX; // -1 to 1
      const distY = (y - centerY) / centerY; // -1 to 1

      // Only rotate if mouse is relatively close to cube
      if (Math.abs(distX) < 1.2 && Math.abs(distY) < 1.2) {
        rotationY.set(distX * 20);
        rotationX.set(-distY * 20);
      }
    };

    // DRAG INTERACTION
    let dragStartX = 0;
    let dragStartY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
      dragMomentumX.current = 0;
      dragMomentumY.current = 0;

      setState((prev) => ({ ...prev, isDragging: true, scale: 1.06 }));
      playClickSound();

      // Visual pulse on click
      cube.style.animation = "none";
      setTimeout(() => {
        cube.style.animation = "cubePulse 0.3s ease-out";
      }, 10);
    };

    const handleMouseMove2 = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - lastMouseX.current;
      const deltaY = e.clientY - lastMouseY.current;

      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;

      dragMomentumX.current = deltaX * 0.5;
      dragMomentumY.current = deltaY * 0.5;

      const rotY = (e.clientX - dragStartX) * 0.5;
      const rotX = -(e.clientY - dragStartY) * 0.5;

      rotationY.set(rotY);
      rotationX.set(rotX);
    };

    const handleMouseUp = () => {
      isDragging = false;
      setState((prev) => ({ ...prev, isDragging: false, scale: hoveredOverCube ? 1.04 : 1 }));

      // Momentum animation
      const dampingFactor = 0.95;
      const momentumTick = () => {
        if (Math.abs(dragMomentumX.current) > 0.1 || Math.abs(dragMomentumY.current) > 0.1) {
          rotationY.set(rotationY.get() + dragMomentumX.current);
          rotationX.set(rotationX.get() + dragMomentumY.current);

          dragMomentumX.current *= dampingFactor;
          dragMomentumY.current *= dampingFactor;

          dragAnimFrame = requestAnimationFrame(momentumTick);
        }
      };
      dragAnimFrame = requestAnimationFrame(momentumTick);
    };

    // HOVER TRACKING
    const handleMouseEnter = () => {
      hoveredOverCube = true;
      setState((prev) => ({ ...prev, isHovered: true, scale: 1.04, glowIntensity: 1 }));
    };

    const handleMouseLeave = () => {
      hoveredOverCube = false;
      if (!isDragging) {
        setState((prev) => ({ ...prev, isHovered: false, scale: 1, glowIntensity: 0.5 }));
        rotationX.set(0);
        rotationY.set(0);
      }
    };

    // IDLE ANIMATION
    const idleAnimate = () => {
      idleRotation += 0.1;
      // Gentle rotation when not interacting
      if (!isDragging && !hoveredOverCube) {
        rotationY.set(Math.sin(idleRotation * 0.01) * 8);
        rotationX.set(Math.cos(idleRotation * 0.01) * 5);
      }
      idleAnimFrame = requestAnimationFrame(idleAnimate);
    };
    idleAnimFrame = requestAnimationFrame(idleAnimate);

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mousemove", handleMouseMove2, { passive: true });
    container.addEventListener("mousedown", handleMouseDown, { passive: true });
    document.addEventListener("mouseup", handleMouseUp, { passive: true });
    cube.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    cube.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousemove", handleMouseMove2);
      container.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      cube.removeEventListener("mouseenter", handleMouseEnter);
      cube.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(idleAnimFrame);
      cancelAnimationFrame(dragAnimFrame);
    };
  }, [rotationX, rotationY]);

  if (SPLINE_SCENE_URL) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center cursor-grab active:cursor-grabbing"
      style={{ perspective: "1200px" }}
    >
      {/* PARALLAX ENVIRONMENT */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }} />

        {/* Radial glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.15) 0%, transparent 60%)",
            opacity: state.glowIntensity,
          }}
        />

        {/* Orbit ring */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-cyan/20 pointer-events-none"
          style={{
            width: "320px",
            height: "320px",
            opacity: 0.6,
          }}
        />
      </div>

      {/* INTERACTIVE CUBE */}
      <motion.div
        ref={cubeRef}
        style={{
          rotateX: sprX,
          rotateY: sprY,
          scale: state.scale,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="relative"
      >
        {/* Glow layer */}
        <motion.div
          className="absolute -inset-8 rounded-3xl bg-gradient-to-r from-neon-cyan/30 to-neon-violet/30 blur-2xl pointer-events-none"
          style={{
            opacity: state.glowIntensity,
            filter: `blur(${20 * state.glowIntensity}px)`,
          }}
        />

        {/* Cube faces - front, right, back, left */}
        {[0, 90, 180, 270].map((rotY, i) => (
          <motion.div
            key={`side-${i}`}
            className="absolute flex items-center justify-center rounded-2xl border text-accent-1 font-mono font-bold text-6xl backdrop-blur-sm cursor-pointer"
            style={{
              width: "240px",
              height: "240px",
              transform: `rotateY(${rotY}deg) translateZ(120px)`,
              backfaceVisibility: "hidden",
              borderColor: "rgba(0, 245, 255, 0.3)",
              background: "rgba(5, 5, 8, 0.6)",
              boxShadow: state.isHovered || state.isDragging
                ? "inset 0 0 60px rgba(0, 245, 255, 0.2), 0 0 40px rgba(0, 245, 255, 0.2)"
                : "inset 0 0 60px rgba(0, 245, 255, 0.06)",
              opacity: faces[i].opacity,
            }}
            whileHover={{ textShadow: "0 0 20px rgba(0, 245, 255, 0.8)" }}
          >
            {faces[i].symbol}
          </motion.div>
        ))}

        {/* Top face */}
        <motion.div
          className="absolute flex flex-col items-center justify-center gap-2 rounded-2xl border border-accent-1/30 bg-gradient-to-b from-neon-cyan/10 to-transparent backdrop-blur-sm"
          style={{
            width: "240px",
            height: "240px",
            transform: "rotateX(90deg) translateZ(120px)",
            backfaceVisibility: "hidden",
            boxShadow: state.isHovered ? "0 0 40px rgba(0, 245, 255, 0.3)" : "none",
          }}
        >
          <GitPullRequest size={48} className="text-neon-cyan opacity-60" />
          <span className="font-mono text-xs tracking-widest text-neon-cyan/70">IMPROVE</span>
        </motion.div>

        {/* Bottom face */}
        <motion.div
          className="absolute flex flex-col items-center justify-center gap-2 rounded-2xl border border-accent-2/30 bg-gradient-to-t from-neon-violet/10 to-transparent backdrop-blur-sm"
          style={{
            width: "240px",
            height: "240px",
            transform: "rotateX(-90deg) translateZ(120px)",
            backfaceVisibility: "hidden",
            boxShadow: state.isHovered ? "0 0 40px rgba(139, 92, 255, 0.3)" : "none",
          }}
        >
          <Layers size={48} className="text-neon-violet opacity-60" />
          <span className="font-mono text-xs tracking-widest text-neon-violet/70">SHIP</span>
        </motion.div>
      </motion.div>

      {/* BOTTOM LABEL */}
      <motion.div
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-neon-cyan/30 bg-surface/80 px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-neon-cyan/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Code2 size={12} className="text-neon-cyan/60" />
        DRAG • HOVER • CLICK
      </motion.div>

      <style jsx>{`
        @keyframes cubePulse {
          0% {
            transform: scale(1.06);
            filter: drop-shadow(0 0 30px rgba(0, 245, 255, 0.8));
          }
          50% {
            transform: scale(1.08);
            filter: drop-shadow(0 0 50px rgba(139, 92, 255, 0.6));
          }
          100% {
            transform: scale(1.04);
            filter: drop-shadow(0 0 20px rgba(0, 245, 255, 0.3));
          }
        }
      `}</style>
    </div>
  );
}
