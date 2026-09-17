"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { REGISTRATION_PATH } from "@/data/event";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-1/[0.08] blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-accent-2/[0.05] blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="eyebrow">The challenge</p>
          <h2 className="h-display text-4xl sm:text-6xl">
            Ready to <span className="text-gradient-green">ship?</span>
          </h2>

          <p className="max-w-md text-lg leading-relaxed text-muted">
            8 hours. One repository. Make it measurably better.
          </p>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row">
            <a
              href={REGISTRATION_PATH}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-green-dark px-8 py-4 text-lg font-semibold text-background transition-all hover:bg-green-deep hover:shadow-[0_0_44px_rgba(63,127,29,0.4)]"
            >
              Register for Code2Consult
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#issues"
              className="inline-flex items-center justify-center rounded-lg border border-foreground/15 bg-surface px-8 py-4 text-lg font-semibold text-foreground transition-all hover:border-accent-1/40 hover:bg-accent-1/[0.06]"
            >
              View challenges
            </a>
          </div>

          <p className="mt-4 text-xs tracking-wide text-foreground/30">
            Organised by 180 Degrees CONSULTing — VIT Chennai
          </p>
        </motion.div>
      </div>
    </section>
  );
}