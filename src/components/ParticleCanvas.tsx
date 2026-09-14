"use client";

import { useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const LIGHT_COLOR = "63, 127, 29";
const DARK_COLOR = "141, 198, 63";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const darkRef = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    darkRef.current = document.documentElement.classList.contains("dark");
    const update = () => {
      darkRef.current = document.documentElement.classList.contains("dark");
    };
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => mo.disconnect();
  }, []);

  const initParticles = useCallback(
    (width: number, height: number) => {
      const count = reducedMotion ? 0 : Math.floor((width * height) / 15000);
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
      particlesRef.current = particles;
    },
    [reducedMotion]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);

    const draw = (opacity: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const base = darkRef.current ? DARK_COLOR : LIGHT_COLOR;
      for (const p of particlesRef.current) {
        ctx.beginPath();
        ctx.arc(p.originX, p.originY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${base}, ${opacity})`;
        ctx.fill();
      }
    };

    if (!reducedMotion) {
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const base = darkRef.current ? DARK_COLOR : LIGHT_COLOR;

        for (const p of particlesRef.current) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 150;

          if (dist < repelRadius && dist > 0) {
            const force = (repelRadius - dist) / repelRadius;
            p.vx += (dx / dist) * force * 0.5;
            p.vy += (dy / dist) * force * 0.5;
          }

          p.vx += (p.originX - p.x) * 0.01;
          p.vy += (p.originY - p.y) * 0.01;
          p.vx *= 0.95;
          p.vy *= 0.95;
          p.x += p.vx;
          p.y += p.vy;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${base}, ${p.opacity})`;
          ctx.fill();
        }

        animFrameRef.current = requestAnimationFrame(animate);
      };

      animate();
    } else {
      draw(0.22);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initParticles, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}