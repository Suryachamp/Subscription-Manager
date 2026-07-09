import { motion } from "motion/react";
import { FaBell, FaChartPie, FaShieldAlt, FaGlobe, FaBolt, FaFileAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaBolt />, title: "Smart Tracking",
    desc: "Auto-detect, categorize, and track every subscription in one unified dashboard.",
    gradient: "linear-gradient(135deg, #f59e0b, #f43f5e)", glow: "rgba(245,158,11,0.08)",
    wide: true,
  },
  {
    icon: <FaBell />, title: "Renewal Alerts",
    desc: "Get notified before renewals hit. Never get surprised by charges again.",
    gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)", glow: "rgba(139,92,246,0.08)",
  },
  {
    icon: <FaChartPie />, title: "Spending Analytics",
    desc: "Visualize spending with beautiful interactive charts and weekly summaries.",
    gradient: "linear-gradient(135deg, #10b981, #06b6d4)", glow: "rgba(16,185,129,0.08)",
  },
  {
    icon: <FaShieldAlt />, title: "Secure & Private",
    desc: "Bank-level AES-256 encryption. Your financial data stays yours — always.",
    gradient: "linear-gradient(135deg, #f43f5e, #f97316)", glow: "rgba(244,63,94,0.08)",
  },
  {
    icon: <FaGlobe />, title: "Multi-Currency",
    desc: "Track in INR, USD, EUR, or any currency with real-time conversion rates.",
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)", glow: "rgba(6,182,212,0.08)",
  },
  {
    icon: <FaFileAlt />, title: "Smart Reports",
    desc: "Monthly PDF/email digests with actionable insights on where every rupee goes.",
    gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)", glow: "rgba(236,72,153,0.08)",
    wide: true,
  },
];

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] ${feature.wide ? "md:col-span-2" : ""}`}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 20% 30%, ${feature.glow}, transparent 60%)` }}
      />

      {/* Top border reveal */}
      <div
        className="absolute left-0 right-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: feature.gradient }}
      />

      <div className="relative p-6 sm:p-8">
        <div
          className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-base text-white"
          style={{ background: feature.gradient, boxShadow: `0 8px 25px ${feature.glow}` }}
        >
          {feature.icon}
        </div>
        <h3 className="mb-2 font-display text-lg font-bold text-[var(--text-primary)]">{feature.title}</h3>
        <p className="max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">{feature.desc}</p>
      </div>
    </motion.div>
  );
}

function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-20"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-rose-500 to-transparent" />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{
                background: "linear-gradient(90deg, #f43f5e, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Features
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-4xl md:text-5xl lg:text-6xl">
            Built for people who<br />
            <span
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #f43f5e, #f59e0b)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "text-gradient 6s linear infinite",
              }}
            >
              hate wasting money.
            </span>
          </h2>
        </motion.div>

        {/* Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;