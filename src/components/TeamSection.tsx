"use client";

import { motion } from "framer-motion";
import { SITE, TEAM_COMPOSITION } from "@/data/event";

export default function TeamSection() {
  return (
    <section className="relative py-24">
      <div className="section-divider mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4">Team composition</p>
            <h2 className="h-display mb-4 text-4xl sm:text-5xl">
              Team size:{" "}
              <span className="text-gradient-green">{SITE.teamSize}</span>
            </h2>
            <p className="mb-10 text-muted">
              Recommended composition. Not every role is required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {TEAM_COMPOSITION.map((t, i) => (
              <div key={t.role} className="flex items-center gap-3">
                <div
                  className="rounded-lg border border-foreground/10 bg-surface px-4 py-3 transition-transform duration-300 hover:scale-105"
                  style={{ borderColor: `${t.color}5c` }}
                >
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: t.color, textShadow: `0 0 18px ${t.color}33` }}
                  >
                    {t.role}
                  </span>
                </div>
                {i < TEAM_COMPOSITION.length - 1 && (
                  <span className="text-lg font-light text-foreground/20">+</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
