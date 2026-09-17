"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Users,
  Zap,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Target,
  Code2,
  Lightbulb,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import "./RecruitmentsPage.css";

interface DepartmentRole {
  title: string;
  level: string;
  status: "open" | "closed";
}

interface Department {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  roles: DepartmentRole[];
  color: string;
}

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
}

function AnimatedCounter({ target, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <div ref={ref}>
      <span className="recruit-stat-value">
        {count}
        {suffix}
      </span>
    </div>
  );
}

interface MouseTiltProps {
  children: React.ReactNode;
  className?: string;
}

function MouseTiltCard({ children, className = "" }: MouseTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    const rotateX = (y / rect.height) * 8;
    const rotateY = -(x / rect.width) * 8;

    setRotation({ x: rotateX, y: rotateY });
    setGlowPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlowPosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`recruit-tilt-card ${className}`}
      style={{
        transform: `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out",
      }}
    >
      <div
        className="recruit-card-glow"
        style={{
          left: `${glowPosition.x}%`,
          top: `${glowPosition.y}%`,
          opacity: rotation.x !== 0 || rotation.y !== 0 ? 1 : 0,
        }}
      />
      {children}
    </div>
  );
}

export default function RecruitmentsContent() {
  const departments: Department[] = [
    {
      id: "technical",
      name: "Technical",
      icon: <Code2 size={24} />,
      description:
        "Build scalable systems, lead technical strategy, and mentor teams in software architecture.",
      roles: [
        { title: "Technical Director", level: "Senior", status: "closed" },
        { title: "DevOps Senior Consultant", level: "Senior", status: "closed" },
        { title: "Product Senior Consultant", level: "Senior", status: "closed" },
        { title: "AI/ML Senior Consultant", level: "Senior", status: "closed" },
        { title: "Technical Member", level: "Entry", status: "open" },
      ],
      color: "var(--accent-1)",
    },
    {
      id: "marketing",
      name: "Marketing",
      icon: <TrendingUp size={24} />,
      description:
        "Drive brand awareness, manage campaigns, and create compelling content strategies.",
      roles: [
        { title: "Marketing Lead", level: "Senior", status: "closed" },
        { title: "Content Strategist", level: "Mid", status: "closed" },
        { title: "Marketing Member", level: "Entry", status: "closed" },
      ],
      color: "var(--accent-2)",
    },
    {
      id: "operations",
      name: "Operations",
      icon: <Briefcase size={24} />,
      description:
        "Optimize processes, manage logistics, and ensure smooth project execution.",
      roles: [
        { title: "Operations Manager", level: "Senior", status: "closed" },
        { title: "Operations Associate", level: "Mid", status: "closed" },
      ],
      color: "var(--accent-1)",
    },
    {
      id: "finance",
      name: "Finance",
      icon: <BarChart3 size={24} />,
      description:
        "Manage budgets, financial planning, and deliver strategic financial insights.",
      roles: [
        { title: "Finance Lead", level: "Senior", status: "closed" },
        { title: "Finance Analyst", level: "Mid", status: "closed" },
      ],
      color: "var(--accent-2)",
    },
    {
      id: "crm",
      name: "CRM",
      icon: <Users size={24} />,
      description:
        "Drive client relationships, manage pipelines, and deliver exceptional service.",
      roles: [
        { title: "CRM Lead", level: "Senior", status: "closed" },
        { title: "CRM Associate", level: "Mid", status: "closed" },
      ],
      color: "var(--accent-1)",
    },
    {
      id: "strategy",
      name: "Business Strategy",
      icon: <Target size={24} />,
      description:
        "Shape organizational strategy, analyze markets, and drive business growth.",
      roles: [
        { title: "Strategy Lead", level: "Senior", status: "closed" },
        { title: "Strategy Analyst", level: "Mid", status: "closed" },
      ],
      color: "var(--accent-2)",
    },
  ];

  const stats = [
    { value: 6, label: "Departments", suffix: "" },
    { value: 5, label: "Technical Roles", suffix: "+" },
    { value: 180, label: "Global Network", suffix: "°" },
    { value: 100, label: "Impact Driven", suffix: "%" },
  ];

  const agenda = [
    {
      time: "Application Opens",
      description: "Submit your resume and motivation letter",
      icon: <Clock size={20} />,
    },
    {
      time: "Shortlist Review",
      description: "We review applications and select promising candidates",
      icon: <CheckCircle2 size={20} />,
    },
    {
      time: "Interview Round",
      description: "Meet our team and discuss your role",
      icon: <MessageSquare size={20} />,
    },
    {
      time: "Offer",
      description: "Join 180 Degrees Consulting VIT Chennai",
      icon: <Lightbulb size={20} />,
    },
  ];

  return (
    <div className="recruit-page">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="recruit-hero"
      >
        <div className="recruit-hero-bg" />

        <div className="recruit-hero-content">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="recruit-badge"
          >
            <Zap size={14} className="recruit-badge-icon" />
            <span>Recruitment Active</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="recruit-hero-heading"
          >
            Join 180 Degrees<br />
            <span className="recruit-gradient">Consulting</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="recruit-hero-description"
          >
            Be part of a global consulting movement. Shape organizations,
            solve real-world problems, and create lasting impact through
            strategy, innovation, and collaboration.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="recruit-cta-group"
          >
            <a
              href="https://vitc-180dc.org/portal"
              target="_blank"
              rel="noopener noreferrer"
              className="recruit-btn recruit-btn-primary"
            >
              Apply Now
              <ArrowRight size={16} />
            </a>
            <button
              className="recruit-btn recruit-btn-secondary"
              onClick={() =>
                document
                  .getElementById("departments")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Departments
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Intro Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
        className="recruit-intro-section"
      >
        <div className="recruit-intro-content">
          <h2 className="recruit-section-heading">Why Join Us?</h2>
          <p className="recruit-section-description">
            180 Degrees Consulting is a global nonprofit organization that brings
            together passionate, ambitious professionals to solve real business
            challenges. Our VIT Chennai chapter is seeking exceptional talent to
            lead innovation and drive impact.
          </p>
          <div className="recruit-intro-highlights">
            {[
              { icon: <Zap size={20} />, text: "Real projects, real impact" },
              {
                icon: <Users size={20} />,
                text: "Collaborate with talented peers",
              },
              {
                icon: <TrendingUp size={20} />,
                text: "Accelerate your professional growth",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="recruit-highlight-item"
              >
                <span className="recruit-highlight-icon">{item.icon}</span>
                <span className="recruit-highlight-text">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Animated Statistics */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-80px" }}
        className="recruit-stats-section"
      >
        <div className="recruit-stats-container">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              viewport={{ once: true, margin: "-40px" }}
              className="recruit-stat"
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="recruit-stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Department Cards Section */}
      <motion.section
        id="departments"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="recruit-departments-section"
      >
        <h2 className="recruit-section-heading">Our Departments</h2>
        <p className="recruit-section-description">
          Explore the different domains where you can make an impact
        </p>

        <div className="recruit-departments-grid">
          {departments.map((dept, idx) => (
            <MouseTiltCard key={dept.id} className="recruit-department-card-wrapper">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
                className="recruit-department-card"
              >
                <div className="recruit-card-header">
                  <div
                    className="recruit-card-icon"
                    style={{ color: dept.color }}
                  >
                    {dept.icon}
                  </div>
                  <h3 className="recruit-card-title">{dept.name}</h3>
                </div>

                <p className="recruit-card-description">{dept.description}</p>

                <div className="recruit-card-roles">
                  <h4 className="recruit-roles-label">Open Roles:</h4>
                  <ul className="recruit-roles-list">
                    {dept.roles.map((role, roleIdx) => (
                      <li
                        key={roleIdx}
                        className={`recruit-role-item ${
                          role.status === "open" ? "open" : "closed"
                        }`}
                      >
                        <span className="recruit-role-name">{role.title}</span>
                        <span className="recruit-role-status">
                          {role.status === "open" ? "Open" : "Closed"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="recruit-card-footer">
                  <a
                    href="https://vitc-180dc.org/portal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="recruit-card-link"
                  >
                    Learn More
                    <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            </MouseTiltCard>
          ))}
        </div>
      </motion.section>

      {/* Department Agenda Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
        className="recruit-agenda-section"
      >
        <h2 className="recruit-section-heading">Recruitment Journey</h2>
        <p className="recruit-section-description">
          Here&apos;s what to expect from our selection process
        </p>

        <div className="recruit-agenda-timeline">
          {agenda.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`recruit-timeline-item ${idx % 2 === 0 ? "left" : "right"}`}
            >
              <div className="recruit-timeline-card glass">
                <div className="recruit-timeline-icon">{item.icon}</div>
                <h4 className="recruit-timeline-time">{item.time}</h4>
                <p className="recruit-timeline-description">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Application Status Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
        className="recruit-status-section glass"
      >
        <div className="recruit-status-content">
          <h2 className="recruit-section-heading">Application Status</h2>
          <p className="recruit-status-text">
            Currently accepting applications for select roles across all
            departments. Check back soon for updates on new openings and
            recruitment cycles.
          </p>
          <div className="recruit-status-indicators">
            <div className="recruit-indicator open">
              <span className="recruit-indicator-dot" />
              <span>Open for Applications</span>
            </div>
            <div className="recruit-indicator closed">
              <span className="recruit-indicator-dot" />
              <span>Selection In Progress</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
        className="recruit-final-cta"
      >
        <h2 className="recruit-cta-heading">Ready to Make an Impact?</h2>
        <p className="recruit-cta-description">
          Join a community of changemakers dedicated to solving real-world
          business challenges through strategy, innovation, and collaboration.
        </p>
        <a
          href="https://vitc-180dc.org/portal"
          target="_blank"
          rel="noopener noreferrer"
          className="recruit-btn recruit-btn-large"
        >
          Start Your Application
          <ArrowRight size={18} />
        </a>
      </motion.section>
    </div>
  );
}
