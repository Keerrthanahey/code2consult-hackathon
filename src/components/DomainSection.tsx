"use client";

import { motion } from "framer-motion";
import { DOMAINS } from "@/data/event";
import DomainCard from "./DomainCard";

export default function DomainSection() {
  return (
    <section id="repositories" className="relative py-24">
      <div className="section-divider mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">CONSULTing domains</p>
            <h2 className="h-display text-4xl sm:text-5xl">
              Ten repositories across{" "}
              <span className="text-gradient-green">five domains.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Every domain mirrors the consulting problems 180DC tackles — each
            backed by a real, documented repository with curated issues.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((domain) => (
            <DomainCard key={domain.id} domain={domain} />
          ))}
        </div>
      </div>
    </section>
  );
}