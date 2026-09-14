"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS, REGISTRATION_PATH } from "@/data/event";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.getElementById(l.href.slice(1))
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toSection = (href: string) => (href.startsWith("#") ? `/${href}` : href);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-green-soft bg-surface-glass backdrop-blur-2xl shadow-[0_8px_40px_rgba(63,127,29,0.16)]"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <Link href="/#home" className="flex items-center gap-3">
            <Image
              src="/180dc-logo.png"
              alt="180 Degrees Consulting VIT Chennai"
              width={129}
              height={123}
              className="theme-logo h-10 w-auto select-none sm:h-11"
              draggable={false}
            />
            <span className="font-mono text-base font-bold tracking-tight text-foreground">
              CODE2
              <span className="text-green-dark">CONSOLE</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={toSection(link.href)}
                className={cn(
                  "text-sm font-medium transition-colors",
                  active === link.href
                    ? "text-green-dark"
                    : "text-muted hover:text-foreground"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <a
              href={REGISTRATION_PATH}
              className="group inline-flex items-center gap-2 rounded-lg bg-green-dark px-5 py-2.5 text-sm font-semibold text-background transition-all hover:bg-green-deep hover:shadow-[0_0_28px_rgba(63,127,29,0.4)]"
            >
              Register
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-50 p-2 text-foreground"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-surface-glass backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col items-start gap-1 px-8 pt-28">
              <AnimatePresence>
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={toSection(link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="w-full border-b border-foreground/10 py-4 text-xl font-medium text-foreground/80 transition-colors hover:text-green-dark"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </AnimatePresence>
              <motion.a
                href={REGISTRATION_PATH}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-dark px-6 py-4 text-lg font-semibold text-background"
                onClick={() => setMobileOpen(false)}
              >
                Register <ArrowRight size={18} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}