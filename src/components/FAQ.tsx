"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ } from "@/data/event";

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="rounded-xl border border-foreground/10 bg-surface transition-colors hover:border-foreground/15"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 rounded-xl px-5 py-5 text-left transition-colors hover:text-accent-1"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-foreground/75">{question}</span>
        <span
          className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-full border transition-colors duration-300 ${
            isOpen
              ? "border-accent-1/40 bg-accent-1/10"
              : "border-foreground/15"
          }`}
        >
          <ChevronDown
            size={14}
            className={`text-foreground/40 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-accent-1" : ""
            }`}
          />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24">
      <div className="section-divider mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="h-display text-4xl sm:text-5xl">
            Questions, <span className="text-gradient-green">answered.</span>
          </h2>
        </motion.div>

        <div className="mx-auto max-w-2xl space-y-2">
          {FAQ.map((item, i) => (
            <AccordionItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}