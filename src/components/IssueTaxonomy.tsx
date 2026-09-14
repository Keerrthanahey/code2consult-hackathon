"use client";

import { motion } from "framer-motion";
import { ISSUE_TYPES } from "@/data/event";
import {
  Bug,
  Zap,
  Lock,
  Brain,
  Plus,
  FlaskConical,
  BarChart3,
  Layers,
  FileText,
  ArrowRightLeft,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Bug,
  Zap,
  Lock,
  Brain,
  Plus,
  TestTube: FlaskConical,
  BarChart3,
  Layers,
  FileText,
  ArrowRightLeft,
};

export default function IssueTaxonomy() {
  return (
    <section id="issues" className="relative py-24">
      <div className="section-divider mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow mb-4">What you can contribute</p>
          <h2 className="h-display text-4xl sm:text-5xl">
            Pick your <span className="text-gradient-green">battle.</span>
          </h2>
          <p className="mt-4 text-muted">
            Every contribution type counts — from a single bug fix to a
            full language conversion.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {ISSUE_TYPES.map((issue, i) => {
            const Icon = iconMap[issue.icon] || Bug;
            return (
              <motion.div
                key={issue.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-xl border border-foreground/10 bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent-1/35 hover:bg-accent-1/[0.05] hover:shadow-[0_8px_30px_rgba(63,127,29,0.08)]"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-surface transition-colors group-hover:bg-accent-1/[0.12]">
                  <Icon
                    size={17}
                    className="text-foreground/45 transition-colors group-hover:text-accent-1"
                  />
                </div>
                <h3 className="mb-1 font-mono text-[11px] font-bold leading-snug tracking-wider text-foreground/80">
                  {issue.title}
                </h3>
                <p className="text-[11px] leading-relaxed text-muted">
                  {issue.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}