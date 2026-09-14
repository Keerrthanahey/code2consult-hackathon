"use client";

import { motion } from "framer-motion";
import { REPOSITORY_STRUCTURE } from "@/data/event";

export default function RepositoryStructure() {
  return (
    <section className="relative py-24">
      <div className="section-divider mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow mb-4">What you receive</p>
          <h2 className="h-display text-4xl sm:text-5xl">
            A repository built to be{" "}
            <span className="text-gradient-green">contributed to.</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-foreground/10 bg-surface p-7 font-mono text-sm"
          >
            <div className="mb-3 flex items-center gap-2 text-xs text-foreground/35">
              <span className="h-2.5 w-2.5 rounded-full bg-accent-1/60" />
              repository/
            </div>
            {REPOSITORY_STRUCTURE.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-start gap-3 border-l border-accent-1/15 py-2 pl-4 transition-colors hover:bg-accent-1/[0.03]"
              >
                <span className="mt-0.5 text-xs text-accent-1/50">
                  {i === REPOSITORY_STRUCTURE.length - 1 ? "└──" : "├──"}
                </span>
                <div>
                  <span className="font-medium text-foreground/75">{item.name}</span>
                  <span className="ml-2 text-xs text-foreground/35">
                    {item.description}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-2xl border border-foreground/10 bg-surface p-6">
              <h3 className="mb-2 font-semibold text-foreground">
                Start to contribute in minutes
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                Documentation-first repositories with curated issue lists mean
                your team spends time solving problems, not decoding an
                unfamiliar codebase.
              </p>
            </div>
            <div className="rounded-2xl border border-foreground/10 bg-surface p-6">
              <h3 className="mb-2 font-semibold text-foreground">
                Built for evaluation
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                Tests, benchmarks and issue briefs give judges objective ground
                for measuring correctness, quality, security and impact.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}