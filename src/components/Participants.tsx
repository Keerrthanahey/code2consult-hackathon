"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Brain,
  ShieldCheck,
  Lightbulb,
  Palette,
  Sprout,
} from "lucide-react";
import { PARTICIPANTS } from "@/data/event";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2,
  Brain,
  ShieldCheck,
  Lightbulb,
  Palette,
  Sprout,
};

export default function Participants() {
  return (
    <section className="relative py-24">
      <div className="section-divider section-glow mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="eyebrow mb-4">Who can participate?</p>
          <h2 className="h-display mx-auto max-w-3xl text-4xl sm:text-5xl">
            You don&apos;t have to be a{" "}
            <span className="text-gradient-green">perfect coder.</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTICIPANTS.map((p, i) => {
            const Icon = iconMap[p.icon] || Code2;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group rounded-xl border border-foreground/10 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-1/25 hover:bg-accent-1/[0.04]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-surface transition-colors group-hover:bg-accent-1/[0.12]">
                  <Icon
                    size={20}
                    className="text-foreground/50 transition-colors group-hover:text-accent-1"
                  />
                </div>
                <h3 className="mb-2 font-mono text-sm font-bold tracking-wider text-foreground/80">
                  {p.title}
                </h3>
                <p className="text-sm text-muted">{p.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
