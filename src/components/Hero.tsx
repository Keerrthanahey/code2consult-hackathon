"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, GitPullRequest } from "lucide-react";
import Image from "next/image";
import { REGISTRATION_PATH } from "@/data/event";
import ParticleCanvas from "./ParticleCanvas";
import dynamic from "next/dynamic";

const SplineScene = dynamic(() => import("./SplineScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-pulse rounded-full bg-green-soft" />
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

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <ParticleCanvas />

      <div className="absolute inset-0 z-0">
        <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-green-soft/40 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-green-light/20 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-20 pt-32 md:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <motion.div
          variants={reducedMotion ? undefined : container}
          {...animProps}
          className="flex flex-col gap-7"
        >
          <motion.div
            {...(reducedMotion ? {} : { variants: item })}
            className="flex items-center gap-3.5"
          >
            <Image
              src="/180dc-logo.png"
              alt="180 Degrees Consulting VIT Chennai"
              width={129}
              height={123}
              className="theme-logo h-11 w-auto select-none"
              draggable={false}
              priority
            />
            <div className="flex flex-col gap-0.5 border-l-2 border-green-soft pl-3.5">
              <span className="eyebrow">180 Degrees Consulting</span>
              <span className="font-mono text-[11px] font-medium tracking-[0.22em] text-muted">
                VIT CHENNAI CHAPTER
              </span>
            </div>
          </motion.div>

          <motion.h1
            {...(reducedMotion ? {} : { variants: item })}
            className="font-mono text-[54px] font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-[84px]"
          >
            CODE2
            <br />
            <span className="text-green-dark">CON</span>
            <span className="text-green-primary">SOLE</span>
          </motion.h1>

          <motion.div
            {...(reducedMotion ? {} : { variants: item })}
            className="flex flex-col gap-2"
          >
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[44px] lg:leading-[1.08]">
              Don&apos;t build from scratch.
              <br />
              <span className="text-gradient-green">
                Improve what already exists.
              </span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted">
              An 8-hour challenge where teams improve real repositories across
              consulting-aligned business domains — and ship the work through a
              production-quality Pull Request.
            </p>
          </motion.div>

          <motion.div
            {...(reducedMotion ? {} : { variants: item })}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href={REGISTRATION_PATH}
              className="group inline-flex items-center gap-2 rounded-lg bg-green-dark px-6 py-3.5 font-semibold text-background transition-all hover:bg-green-deep hover:shadow-[0_0_36px_rgba(63,127,29,0.4)]"
            >
              Register Now
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-lg border border-foreground/15 bg-surface px-6 py-3.5 font-semibold text-foreground transition-all hover:border-green-dark/40 hover:bg-green-soft/40"
            >
              Explore the challenge
            </a>
          </motion.div>

          <motion.div
            {...(reducedMotion ? {} : { variants: item })}
            className="flex flex-wrap gap-2"
          >
            {metaItems.map((m, i) => (
              <span
                key={m}
                className="font-mono text-[11px] tracking-[0.14em] text-foreground/45"
              >
                {m}
                {i < metaItems.length - 1 && (
                  <span className="mx-2 text-green-dark/40">•</span>
                )}
              </span>
            ))}
          </motion.div>

          <motion.div
            {...(reducedMotion ? {} : { variants: item })}
            className="flex items-center gap-2 text-xs text-muted"
          >
            <GitPullRequest size={14} className="text-green-dark/60" />
            <span>
              Your contribution is the unit of evaluation — not your pitch.
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="relative flex h-[340px] items-center justify-center md:h-[460px]"
        >
          <SplineScene />
        </motion.div>
      </div>
    </section>
  );
}