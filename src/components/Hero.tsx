"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, GitPullRequest } from "lucide-react";
import Image from "next/image";
import { REGISTRATION_PATH } from "@/data/event";
import dynamic from "next/dynamic";

const InteractiveCube = dynamic(() => import("./SplineScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 rounded-full border border-neon-cyan/30 animate-pulse" />
    </div>
  ),
});

const metaItems = ["8 HOURS", "OPEN SOURCE", "GITHUB PRs", "TEAM BASED"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const animProps = reducedMotion ? {} : { initial: "hidden" as const, animate: "show" as const };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Clean background with subtle grid */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(0, 245, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.02) 1px, transparent 1px)`,
        backgroundSize: "100px 100px",
      }} />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(0, 245, 255, 0.05) 0%, transparent 60%)",
      }} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-20 pt-32 md:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        {/* LEFT COLUMN - Content */}
        <motion.div
          variants={reducedMotion ? undefined : container}
          {...animProps}
          className="flex flex-col gap-7"
        >
          {/* Organization header */}
          <motion.div
            {...(reducedMotion ? {} : { variants: item })}
            className="flex items-center gap-3"
          >
            <Image
              src="/180dc-logo.png"
              alt="180 Degrees Consulting VIT Chennai"
              width={129}
              height={123}
              className="h-10 w-auto select-none filter drop-shadow-[0_0_8px_rgba(0,245,255,0.2)]"
              draggable={false}
              priority
            />
            <div className="flex flex-col gap-0.5 border-l border-neon-cyan/40 pl-3">
              <span className="eyebrow">180 Degrees Consulting</span>
              <span className="font-mono text-[11px] font-medium tracking-wider text-foreground-muted">
                VIT CHENNAI
              </span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            {...(reducedMotion ? {} : { variants: item })}
            className="font-mono text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          >
            CODE2
            <br />
            <span className="text-gradient-cyan">CONSOLE</span>
          </motion.h1>

          {/* Tagline */}
          <motion.div
            {...(reducedMotion ? {} : { variants: item })}
            className="flex flex-col gap-3"
          >
            <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
              Don't build from scratch.
              <br />
              <span className="text-gradient-neon">Improve what already exists.</span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-foreground-muted">
              An 8-hour challenge where teams improve real repositories across consulting-aligned business domains and ship the work through production-quality Pull Requests.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            {...(reducedMotion ? {} : { variants: item })}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.a
              href={REGISTRATION_PATH}
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all border border-neon-cyan/60 hover:border-neon-cyan bg-transparent hover:bg-neon-cyan/10 text-neon-cyan hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Register Now
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all border border-foreground/20 hover:border-neon-cyan/40 bg-transparent hover:bg-foreground/5 text-foreground hover:text-neon-cyan"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore
            </motion.a>
          </motion.div>

          {/* Meta items */}
          <motion.div
            {...(reducedMotion ? {} : { variants: item })}
            className="flex flex-wrap gap-3"
          >
            {metaItems.map((m, i) => (
              <span key={m} className="font-mono text-xs tracking-widest text-foreground-muted/70">
                {m}
                {i < metaItems.length - 1 && <span className="mx-2">•</span>}
              </span>
            ))}
          </motion.div>

          {/* Subtext */}
          <motion.div
            {...(reducedMotion ? {} : { variants: item })}
            className="flex items-center gap-2 text-xs text-foreground-muted"
          >
            <GitPullRequest size={14} className="text-neon-cyan/50" />
            <span>Your contribution is the unit of evaluation — not your pitch.</span>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN - Interactive Cube */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex h-[340px] items-center justify-center md:h-[460px]"
        >
          <InteractiveCube />
        </motion.div>
      </div>
    </section>
  );
}
