"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SPLINE_SCENE_URL } from "@/data/event";

const faces = [
  { label: "CODE", color: "#00F5FF" },
  { label: "SOLVE", color: "#8B5CFF" },
  { label: "BUILD", color: "#00F5FF" },
  { label: "CONSULT", color: "#FF2BD6" },
  { label: "CREATE", color: "#8B5CFF" },
  { label: "IMPACT", color: "#00F5FF" },
];

export default function InteractiveCube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { damping: 25, mass: 1, stiffness: 120 });
  const springY = useSpring(rotY, { damping: 25, mass: 1, stiffness: 120 });

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  let idleAngle = useRef(0);
  let idleFrame = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const cube = cubeRef.current;
    if (!container || !cube || SPLINE_SCENE_URL) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let isMouseDown = false;
    let isDraggingLocal = false;

    // IDLE ANIMATION
    const idleAnimation = () => {
      if (!isMouseDown && !isHovered) {
        idleAngle.current += 0.3;
        rotY.set(Math.sin(idleAngle.current * 0.02) * 12);
        rotX.set(Math.cos(idleAngle.current * 0.02) * 8);
      }
      idleFrame.current = requestAnimationFrame(idleAnimation);
    };
    idleFrame.current = requestAnimationFrame(idleAnimation);

    // POINTER MOVE - Interactive cube rotation
    const handlePointerMove = (e: PointerEvent) => {
      if (isMouseDown || !container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only rotate if reasonably close
      const distX = (x - centerX) / centerX;
      const distY = (y - centerY) / centerY;

      if (Math.abs(distX) < 1.5 && Math.abs(distY) < 1.5) {
        rotY.set(distX * 25);
        rotX.set(-distY * 25);
      }
    };

    // DRAG INTERACTION
    const handlePointerDown = (e: PointerEvent) => {
      if (e.target !== cube) return;
      isMouseDown = true;
      isDraggingLocal = true;
      setIsDragging(true);
      dragStartX.current = e.clientX;
      dragStartY.current = e.clientY;

      // Visual feedback
      cube.style.transition = "none";
    };

    const handlePointerMove2 = (e: PointerEvent) => {
      if (!isMouseDown || !isDraggingLocal) return;

      const deltaX = e.clientX - dragStartX.current;
      const deltaY = e.clientY - dragStartY.current;

      rotY.set(rotY.get() + deltaX * 0.5);
      rotX.set(rotX.get() - deltaY * 0.5);
    };

    const handlePointerUp = () => {
      if (isMouseDown) {
        isMouseDown = false;
        isDraggingLocal = false;
        setIsDragging(false);
        cube.style.transition = "all 0.3s ease-out";
      }
    };

    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointermove", handlePointerMove2, { passive: true });
    container.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointermove", handlePointerMove2);
      container.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      cancelAnimationFrame(idleFrame.current);
    };
  }, [isHovered, rotX, rotY]);

  if (SPLINE_SCENE_URL) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      {/* Subtle background */}
      <div className="absolute inset-0 z-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.1) 0%, transparent 60%)`,
      }} />

      {/* Interactive cube */}
      <motion.div
        ref={cubeRef}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative h-60 w-60 cursor-grab active:cursor-grabbing ${
          isDragging ? "scale-105" : isHovered ? "scale-104" : "scale-100"
        } transition-transform duration-200`}
      >
        {/* Cube faces */}
        {[
          { rotY: 0, rotZ: 0 },
          { rotY: 90, rotZ: 0 },
          { rotY: 180, rotZ: 0 },
          { rotY: 270, rotZ: 0 },
          { rotX: 90, rotY: 0, rotZ: 0 },
          { rotX: -90, rotY: 0, rotZ: 0 },
        ].map((rotation, i) => (
          <motion.div
            key={i}
            className="absolute flex items-center justify-center h-60 w-60 rounded-lg border text-lg font-mono font-bold"
            style={{
              transform: `rotateX(${rotation.rotX || 0}deg) rotateY(${rotation.rotY || 0}deg) rotateZ(${rotation.rotZ || 0}deg) translateZ(120px)`,
              backfaceVisibility: "hidden",
              borderColor: faces[i].color,
              color: faces[i].color,
              background: "rgba(5, 5, 8, 0.7)",
              boxShadow: isHovered ? `inset 0 0 30px ${faces[i].color}22, 0 0 20px ${faces[i].color}33` : `inset 0 0 20px ${faces[i].color}11`,
              opacity: isHovered ? 0.95 : 0.8,
            }}
          >
            {faces[i].label}
          </motion.div>
        ))}

        {/* Glow effect */}
        <motion.div
          className="absolute -inset-8 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${isHovered ? "rgba(0, 245, 255, 0.2)" : "rgba(0, 245, 255, 0.1)"} 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      {/* Instruction text */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-xs font-mono text-foreground-muted"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        drag • hover • interact
      </motion.div>
    </div>
  );
}
