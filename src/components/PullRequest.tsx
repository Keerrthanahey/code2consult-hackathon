"use client";

import { motion } from "framer-motion";
import { GitPullRequest, CheckCircle2, GitBranch } from "lucide-react";

const checks = [
  "Tests passing",
  "Performance improved",
  "Documentation updated",
  "Security reviewed",
];

export default function PullRequest() {
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
          <p className="eyebrow mb-4">The deliverable</p>
          <h2 className="h-display text-4xl sm:text-5xl">
            Everything you ship arrives as a{" "}
            <span className="text-gradient-green">pull request.</span>
          </h2>
          <p className="mt-4 text-muted">
            One PR carries your code, your tests and your documentation — and
            that PR is what goes under review.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto max-w-2xl"
        >
          <div className="pr-card glass-green rounded-2xl p-7">
            <div className="mb-5 flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-1/[0.12]">
                <GitPullRequest size={18} className="text-accent-1" />
              </span>
              <div>
                <p className="flex items-center gap-2 font-mono text-xs text-foreground/40">
                  <GitBranch size={12} className="text-accent-1/60" />
                  Code2Consult / team-alpha
                </p>
                <p className="font-mono text-sm font-medium text-foreground">
                  feat: optimize campaign analytics
                </p>
              </div>
            </div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent-1/[0.1] px-3 py-1 font-mono text-xs font-medium text-accent-1">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent-1" />
              Ready for review
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {checks.map((check) => (
                <div
                  key={check}
                  className="flex items-center gap-2 text-sm text-foreground/60"
                >
                  <CheckCircle2 size={14} className="text-accent-1" />
                  {check}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-lg text-muted">
            The best code isn&apos;t always the best solution.{" "}
            <span className="font-semibold text-foreground">
              The best contribution is.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}