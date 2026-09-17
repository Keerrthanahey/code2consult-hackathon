"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  ArrowLeft,
  GitPullRequest,
  FolderGit2,
  CheckCircle2,
} from "lucide-react";
import { SITE, isRegistrationOpen } from "@/data/event";
import { displayOr } from "@/lib/utils";

const details = [
  { icon: Clock, label: "Duration", value: `${SITE.hours} hours` },
  { icon: CalendarDays, label: "Event date", value: displayOr(SITE.eventDate) },
  {
    icon: CalendarDays,
    label: "Registration closes",
    value: displayOr(SITE.registrationDeadline),
  },
  { icon: MapPin, label: "Venue", value: displayOr(SITE.venue) },
  { icon: Users, label: "Team size", value: SITE.teamSize },
];

const nextSteps = [
  {
    icon: CheckCircle2,
    title: "Register your team",
    body: "One entry per team of 2–4 members.",
  },
  {
    icon: FolderGit2,
    title: "Receive your repository",
    body: "A documented codebase with curated issues.",
  },
  {
    icon: GitPullRequest,
    title: "Ship your Pull Request",
    body: "A production-quality contribution is your submission.",
  },
];

const openForRegistration = isRegistrationOpen();

export default function RegisterContent() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-accent-1/[0.07] blur-[120px]" />
        <div className="absolute -right-24 bottom-10 h-[380px] w-[380px] rounded-full bg-accent-2/[0.05] blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-12 px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <Link
            href="/#home"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest text-muted transition-colors hover:text-accent-1"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            BACK TO HOMEPAGE
          </Link>

          <p className="eyebrow">Registration · 180 Degrees CONSULTing — VIT Chennai</p>
          <h1 className="h-display text-4xl sm:text-6xl">
            Register for{" "}
            <span className="text-gradient-green">Code2Consult.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            One team. One repository. Eight hours to make it measurably
            better. Your contribution is the submission.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid gap-3 sm:grid-cols-2"
        >
          {details.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.label}
                className="flex items-center gap-4 rounded-xl border border-foreground/10 bg-surface p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-1/[0.1]">
                  <Icon size={18} className="text-accent-1" />
                </span>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.18em] text-foreground/35">
                    {d.label.toUpperCase()}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {d.value}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col gap-5"
        >
          <div className="rounded-2xl border border-foreground/10 bg-surface p-7">
            {openForRegistration ? (
              <div className="flex flex-col gap-4">
                <p className="eyebrow">Registrations are open</p>
                <h2 className="h-display text-3xl">Lock your team&apos;s spot.</h2>
                <a
                  href={SITE.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-2 rounded-lg bg-green-dark px-8 py-4 text-lg font-semibold text-background transition-all hover:bg-green-deep hover:shadow-[0_0_44px_rgba(63,127,29,0.4)]"
                >
                  Open the registration form
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-1/25 bg-accent-1/[0.07] px-4 py-1.5 font-mono text-xs tracking-[0.18em] text-accent-1">
                  <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent-1" />
                  REGISTRATION OPENS SOON
                </div>
                <h2 className="h-display text-3xl">Getting ready to open.</h2>
                <p className="max-w-xl text-sm leading-relaxed text-muted">
                  The official registration form will appear here as soon as
                  registrations open. All event details above are confirmed.
                  Questions? See the{" "}
                  <Link
                    href="/#faq"
                    className="font-medium text-accent-1 underline-offset-4 hover:underline"
                  >
                    FAQ
                  </Link>
                  .
                </p>
              </div>
            )}

            <div className="mt-8 grid gap-3 pt-8 sm:grid-cols-3">
              {nextSteps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="flex flex-col gap-2.5 rounded-xl border border-foreground/10 bg-surface p-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-1/[0.1]">
                        <Icon size={15} className="text-accent-1" />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/30">
                        STEP {i + 1}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      {s.title}
                    </p>
                    <p className="text-xs leading-relaxed text-muted">
                      {s.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#issues"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-foreground/15 bg-surface px-6 py-3.5 font-semibold text-foreground transition-all hover:border-accent-1/40 hover:bg-accent-1/[0.06]"
            >
              Explore the challenges
            </Link>
            <Link
              href="/#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-foreground/15 bg-surface px-6 py-3.5 font-semibold text-foreground transition-all hover:border-accent-1/40 hover:bg-accent-1/[0.06]"
            >
              How it works
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}