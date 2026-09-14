"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Megaphone,
  Target,
  Shield,
  Workflow,
  Users,
  ChevronDown,
  FolderGit2,
} from "lucide-react";
import type { Domain } from "@/data/event";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Megaphone,
  Target,
  Shield,
  Workflow,
  Users,
};

export default function DomainCard({ domain }: { domain: Domain }) {
  const [expanded, setExpanded] = useState(false);
  const [transform, setTransform] = useState("perspective(900px)");
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const Icon = iconMap[domain.icon] || Target;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * 7;
    const ry = (px - 0.5) * 7;
    setTransform(
      `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`
    );
    setSpotlight({ x: px * 100, y: py * 100, opacity: 1 });
  };

  const handleMouseLeave = () => {
    if (reducedMotion) return;
    setTransform("perspective(900px)");
    setSpotlight((s) => ({ ...s, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="tilt-card"
    >
      <div
        data-spotlight
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: reducedMotion ? undefined : transform,
          transition: "transform 0.15s ease-out",
        }}
        className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-surface transition-colors duration-300 hover:border-green-dark/30"
      >
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(63,127,29,0.1), transparent 55%)`,
          }}
        />

        <div className="relative z-10 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5"
                style={{ background: `${domain.color}1a` }}
              >
                <Icon size={20} className="text-accent-1" />
              </span>
              <h3 className="font-semibold tracking-wide text-foreground">
                {domain.name}
              </h3>
            </div>
            <span className="flex items-center gap-1 font-mono text-xs text-foreground/35">
              <FolderGit2 size={13} className="text-accent-1/60" />
              {domain.repositories.length}
            </span>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {domain.repositories.map((repo) => (
              <span
                key={repo.name}
                className="rounded-md border border-accent-1/15 bg-accent-1/[0.06] px-2.5 py-1 font-mono text-xs text-accent-1/80"
              >
                {repo.name}
              </span>
            ))}
          </div>

          <div className="mb-4 flex flex-col gap-3">
            {domain.repositories.map((repo) => (
              <div key={repo.name}>
                <p className="mb-1 text-sm font-medium text-foreground/75">
                  {repo.name}
                </p>
                <p className="text-xs text-muted">{repo.description}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 font-mono text-xs text-green-dark transition-colors hover:text-green-deep"
            aria-expanded={expanded}
          >
            {expanded ? "Hide issues" : "View issues"}
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {domain.repositories.flatMap((repo) =>
                    repo.issues.map((issue) => (
                      <span
                        key={`${repo.name}-${issue}`}
                        className="rounded-full border border-foreground/10 bg-surface px-2.5 py-1 text-[11px] text-foreground/55"
                      >
                        {issue}
                      </span>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}