"use client";

import { motion } from "framer-motion";

import { HOW_IT_WORKS } from "@/data/event";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24">
      <div className="section-divider mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow mb-4">The process</p>
          <h2 className="h-display text-4xl sm:text-5xl">
            From business problem to{" "}
            <span className="text-gradient-green">impact</span>, in 8 hours.
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[12px] top-0 bottom-0 w-px bg-gradient-to-b from-accent-1/30 via-accent-1/15 to-transparent sm:left-1/2 sm:-translate-x-px" />

          <div className="space-y-2">
            {HOW_IT_WORKS.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className={`relative flex items-start gap-5 pl-10 sm:w-1/2 sm:pl-0 ${
                    left ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"
                  }`}
                >
                  <div
                    className={`absolute top-1.5 left-[6px] flex h-3 w-3 items-center justify-center sm:top-1/2 sm:left-auto ${
                      left
                        ? "sm:left-auto sm:-right-[6px]"
                        : "sm:-left-[6px] sm:right-auto"
                    }`}
                  >
                    <span className="block h-3 w-3 rounded-full border-2 border-accent-1 bg-background" />
                  </div>

                  <div
                    className={`flex-1 rounded-2xl border border-foreground/10 bg-surface p-6 transition-colors duration-300 hover:border-accent-1/25 hover:bg-accent-1/[0.04] ${
                      left ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`mb-3 flex items-center gap-3 ${
                        left ? "sm:flex-row-reverse" : ""
                      }`}
                    >
                      <span className="font-mono text-2xl font-bold text-accent-1/70">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="mb-1.5 font-semibold tracking-wide text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}