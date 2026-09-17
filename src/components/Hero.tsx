"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useViewportScroll, useScroll } from "framer-motion";
import { ArrowRight, GitPullRequest } from "lucide-react";
import Image from "next/image";
import { REGISTRATION_PATH } from "@/data/event";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const InteractiveCube = dynamic(() => import("./SplineScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-pulse rounded-full bg-neon-cyan/20" />
    </div>
  ),
});

const metaItems = ["8 HOURS", "OPEN SOURCE", "GITHUB PRs", "TEAM BASED"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const animProps = reducedMotion ? {} : { initial: "hidden" as const, animate: "show" as const };
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const springX = useSpring(useMotionValue(0), { damping: 30, mass: 1, stiffness: 100 });
  const springY = useSpring(useMotionValue(0), { damping: 30, mass: 1, stiffness: 100 });

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 20 - 10;
      const y = (e.clientY / window.innerHeight) * 20 - 10;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-background via-background to-background/50"
    >
      {/* ANIMATED BACKGROUND ENVIRONMENT */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
        transition={{ type: "spring", damping: 30, mass: 2, stiffness: 50 }}
      >
        {/* Animated gradient blobs */}
        <motion.div
          className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-neon-cyan/5 blur-[120px]"
          animate={{
            x: Math.sin(Date.now() / 3000) * 40,
            y: Math.cos(Date.now() / 3000) * 40,
          }}
          transition={{ duration: 0.1, repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-neon-violet/5 blur-[110px]"
          animate={{
            x: Math.cos(Date.now() / 4000) * 30,
            y: Math.sin(Date.now() / 4000) * 30,
          }}
          transition={{ duration: 0.1, repeat: Infinity }}
        />
      </motion.div>

      {/* GRID BACKGROUND */}
      <div 
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-20 pt-32 md:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        {/* LEFT CONTENT */}
        <motion.div
          variants={reducedMotion ? undefined : container}
          {...animProps}
          className="flex flex-col gap-7"
        >
          {/* Logo section */}
          <motion.div
            {...(reducedMotion ? {} : { variants: item })}
            className="flex items-center gap-3.5"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <Image
                src="/180dc-logo.png"
                alt="180 Degrees Consulting VIT Chennai"
                width={129}
                height={123}
                className="theme-logo h-11 w-auto select-none filter drop-shadow-[0_0_8px_rgba(0,245,255,0.3)]"
                draggable={false}
                priority
              />
            </motion.div>
            <div className="flex flex-col gap-0.5 border-l-2 border-neon-cyan/50 pl-3.5">
              <span className="eyebrow">180 DEGREES CONSULTING</span>
              <span className="font-mono text-[11px] font-medium tracking-[0.22em] text-muted">
                VIT CHENNAI CHAPTER
              </span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            {...(reducedMotion ? {} : { variants: item })}
            className="font-mono text-[54px] font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-[84px]"
          >
            CODE2
            <br />
            <span className="text-gradient-cyan">CONSOLE</span>
          </motion.h1>

          {/* Description */}
          <motion.div
            {...(reducedMotion ? {} : { variants: item })}
            className="flex flex-col gap-2"
          >
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[44px] lg:leading-[1.08]">
              Don&apos;t build from scratch.
              <br />
              <span className="text-gradient-neon">
                Improve what already exists.
              </span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-foreground-muted">
              An 8-hour challenge where teams improve real repositories across
              consulting-aligned business domains — and ship the work through a
              production-quality Pull Request.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            {...(reducedMotion ? {} : { variants: item })}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.a
              href={REGISTRATION_PATH}
              className="group inline-flex items-center gap-2 px-6 py-3.5 font-semibold transition-all border border-neon-cyan/50 hover:border-neon-cyan bg-transparent hover:bg-neon-cyan/5 text-neon-cyan hover:shadow-[0_0_30px_rgba(0,245,255,0.6)] rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Register Now
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.a>
            <motion.a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold transition-all border border-neon-cyan/30 hover:border-neon-cyan bg-transparent hover:bg-neon-cyan/5 text-foreground rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore
            </motion.a>
          </motion.div>

          {/* Meta items */}
          <motion.div
            {...(reducedMotion ? {} : { variants: item })}
            className="flex flex-wrap gap-2"
          >
            {metaItems.map((m, i) => (
              <span
                key={m}
                className="font-mono text-[11px] tracking-[0.14em] text-foreground/40"
              >
                {m}
                {i < metaItems.length - 1 && (
                  <span className="mx-2 text-neon-cyan/40">•</span>
                )}
              </span>
            ))}
          </motion.div>

          {/* Subtext */}
          <motion.div
            {...(reducedMotion ? {} : { variants: item })}
            className="flex items-center gap-2 text-xs text-foreground-muted"
          >
            <GitPullRequest size={14} className="text-neon-cyan/60" />
            <span>
              Your contribution is the unit of evaluation — not your pitch.
            </span>
          </motion.div>
        </motion.div>

        {/* RIGHT - INTERACTIVE CUBE */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative flex h-[340px] items-center justify-center md:h-[460px]"
        >
          <InteractiveCube />
        </motion.div>
      </div>
    </section>
  );
}
