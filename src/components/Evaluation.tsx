"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EVALUATION } from "@/data/event";

const totalPoints = EVALUATION.reduce((sum, e) => sum + e.points, 0);

function Bar({
  category,
  points,
  index,
}: {
  category: string;
  points: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const width = (points / 20) * 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="flex items-center gap-4"
    >
      <div className="w-44 shrink-0 text-right sm:w-52">
        <span className="text-xs font-medium text-foreground/60">{category}</span>
      </div>
      <div className="relative h-7 flex-1 overflow-hidden rounded-md border border-foreground/10 bg-surface">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${width}%` } : {}}
          transition={{ duration: 0.9, delay: index * 0.06 + 0.2, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 rounded-md"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,150,105,0.7), rgba(141,198,63,0.7))",
          }}
        />
        <span className="absolute inset-y-0 left-3 flex items-center font-mono text-xs font-bold text-white">
          {points}
        </span>
      </div>
    </motion.div>
  );
}

export default function Evaluation() {
  return (
    <section id="evaluation" className="relative py-24">
      <div className="section-divider mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow mb-4">Suggested scoring</p>
          <h2 className="h-display text-4xl sm:text-5xl">
            <span className="text-gradient-green">{totalPoints}</span> points.
          </h2>
          <p className="mt-4 text-muted">
            Correctness, quality, security, scalability, testing and real-world
            usefulness — weighted toward the solution, not the pitch.
          </p>
        </motion.div>

        <div className="mx-auto max-w-2xl space-y-3">
          {EVALUATION.map((item, i) => (
            <Bar
              key={item.category}
              category={item.category}
              points={item.points}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}