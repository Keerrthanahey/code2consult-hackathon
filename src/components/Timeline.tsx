"use client";

import { motion } from "framer-motion";
import { TIMELINE } from "@/data/event";

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-24">
      <div className="section-divider mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow mb-4">Eight hours</p>
          <h2 className="h-display text-4xl sm:text-5xl">
            The <span className="text-gradient-green">timeline.</span>
          </h2>
          <p className="mt-4 text-muted">
            A compressed, focused sprint — from opening to results.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent-1/40 via-accent-1/20 to-accent-1/5 md:left-1/2 md:-translate-x-px" />

          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className={`relative mb-5 flex items-start gap-4 pl-14 md:w-1/2 md:pl-0 ${
                i % 2 === 0
                  ? "md:pr-12 md:text-right"
                  : "md:ml-auto md:flex-row-reverse md:pl-12 md:pr-0 md:text-left"
              }`}
            >
              <div
                className={`absolute left-5 top-2 -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 ${
                  i % 2 === 0
                    ? "md:left-auto md:-right-[11px] md:translate-x-0"
                    : "md:left-0 md:-translate-x-1/2"
                }`}
              >
                <span className="block h-3 w-3 rounded-full border-2 border-accent-1 bg-background" />
              </div>

              <div className="flex-1">
                <span className="mb-1 block font-mono text-lg font-bold text-accent-1">
                  {item.time}
                </span>
                <h3 className="font-semibold tracking-wide text-foreground">
                  {item.label}
                </h3>
                <p className="mt-0.5 text-xs text-muted">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}