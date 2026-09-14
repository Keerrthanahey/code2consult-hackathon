"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LANGUAGE_CONVERSIONS } from "@/data/event";

export default function LanguageTrack() {
  return (
    <section className="relative py-24">
      <div className="section-divider section-glow mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="eyebrow mb-4">Special track</p>
          <h2 className="h-display text-4xl sm:text-5xl">
            Change the language.
            <br />
            <span className="text-gradient-green">Keep the system.</span>
          </h2>
          <p className="mt-4 text-muted">
            A dedicated track, separate from the issue catalogue. Port a
            repository or subsystem to another language while preserving API
            compatibility, functionality and tests.
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LANGUAGE_CONVERSIONS.map((conv, i) => (
            <motion.div
              key={`${conv.from}-${conv.to}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex items-center justify-between rounded-xl border border-foreground/10 bg-surface p-5 transition-all duration-300 hover:border-accent-1/30 hover:bg-accent-1/[0.04]"
            >
              <span className="font-mono text-sm font-medium text-foreground/70">
                {conv.from}
              </span>
              <ArrowRight
                size={16}
                className="text-accent-1/50 transition-all group-hover:translate-x-1 group-hover:text-accent-1"
              />
              <span className="font-mono text-sm font-bold text-accent-1">
                {conv.to}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-foreground/10 bg-surface px-6 py-5"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-foreground/40">
            EVALUATED ON
          </span>
          <div className="flex flex-wrap gap-2">
            {["Correctness", "Test Coverage", "Maintainability", "Performance"].map(
              (criteria) => (
                <span
                  key={criteria}
                  className="rounded-full border border-accent-1/20 bg-accent-1/[0.06] px-3 py-1 text-xs font-medium text-accent-1/85"
                >
                  {criteria}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}