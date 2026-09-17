"use client";

import { motion } from "framer-motion";
import { GitPullRequest, GitFork, Scale, Workflow } from "lucide-react";

const pillars = [
  {
    icon: GitFork,
    title: "Real repositories",
    body: "You receive a living codebase, not an empty folder.",
  },
  {
    icon: Scale,
    title: "Real problems",
    body: "Challenges mapped to consulting business domains.",
  },
  {
    icon: GitPullRequest,
    title: "Real pull requests",
    body: "Production-quality contributions are the deliverable.",
  },
  {
    icon: Workflow,
    title: "Measurable impact",
    body: "Improvements that can survive beyond the event.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="section-divider section-glow mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-7"
          >
            <p className="eyebrow">Why Code2Consult exists</p>
            <h2 className="h-display text-4xl sm:text-5xl lg:text-6xl">
              Not another disposable{" "}
              <span className="text-gradient-green">hackathon project.</span>
            </h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed text-muted">
              <p>
                Most hackathons hand you eight hours and a blank folder. The
                result is a demo that dies the moment judging ends.
              </p>
              <p>
                <span className="font-semibold text-foreground">
                  Code2Consult runs on the principle consultants live by:
                </span>{" "}
                never rebuild what can be improved. Step into an existing
                codebase, understand the problem underneath the issue, and make
                it measurably better — with the same care you&apos;d bring to
                production software.
              </p>
              <p>
                So the evaluation follows the work, not the pitch.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group rounded-2xl border border-foreground/10 bg-surface p-6 transition-all duration-300 hover:border-accent-1/25 hover:bg-accent-1/[0.04]"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-1/[0.1] transition-transform duration-300 group-hover:scale-110">
                    <Icon size={20} className="text-accent-1" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {pillar.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}