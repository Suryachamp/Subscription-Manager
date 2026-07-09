import { motion } from "motion/react";
import { FaBell, FaChartPie, FaShieldAlt, FaGlobe, FaBolt, FaFileAlt } from "react-icons/fa";

const features = [
  { icon: <FaBolt />, title: "Smart Tracking", desc: "Auto-detect, categorize, and track every subscription in one unified dashboard.", wide: true },
  { icon: <FaBell />, title: "Renewal Alerts", desc: "Get notified before renewals hit. Never get surprised by charges again." },
  { icon: <FaChartPie />, title: "Spending Analytics", desc: "Visualize spending with beautiful interactive charts and weekly summaries." },
  { icon: <FaShieldAlt />, title: "Secure & Private", desc: "Bank-level AES-256 encryption. Your financial data stays yours — always." },
  { icon: <FaGlobe />, title: "Multi-Currency", desc: "Track in INR, USD, EUR, or any currency with real-time conversion rates." },
  { icon: <FaFileAlt />, title: "Smart Reports", desc: "Monthly PDF/email digests with actionable insights on where every rupee goes.", wide: true },
];

function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background glass patches for Features section */}
      <div className="absolute inset-0 -z-10 bg-[var(--bg-secondary)]" />
      <div className="absolute -left-64 top-1/4 h-[500px] w-[500px] rounded-full mix-blend-multiply filter blur-[100px]" style={{ background: "rgba(249, 115, 22, 0.08)" }} />
      <div className="absolute -right-64 bottom-0 h-[600px] w-[600px] rounded-full mix-blend-multiply filter blur-[100px]" style={{ background: "rgba(251, 146, 60, 0.06)" }} />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 text-center md:text-left"
        >
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Features</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
            Built for people who
            <br className="hidden md:block" />
            <span className="text-[var(--accent)] md:ml-2">hate wasting money.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className={`glass-card group rounded-3xl p-6 transition-transform duration-300 sm:p-8 ${f.wide ? "md:col-span-2" : ""}`}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-xl text-[var(--accent)] border border-[var(--accent)]/10 transition-transform duration-300 group-hover:scale-110">
                {f.icon}
              </div>
              <h3 className="mb-2 font-display text-xl font-bold text-[var(--text-primary)]">{f.title}</h3>
              <p className="max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;