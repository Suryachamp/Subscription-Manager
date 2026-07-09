import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "../../ui/Button";

const links = [
  { label: "Features", href: "#features" },
  { label: "Stats", href: "#stats" },
  { label: "Pricing", href: "#cta" },
];

function LandingNavbar() {
  const [hovered, setHovered] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6 sm:pt-4">
        <nav className="glass-strong flex h-14 items-center justify-between rounded-2xl px-4 sm:h-16 sm:px-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl font-display text-sm font-bold text-white sm:h-9 sm:w-9"
              style={{
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                boxShadow: "0 0 20px rgba(16,185,129,0.3)",
              }}
            >
              S
            </div>
            <div>
              <h1 className="font-display text-sm font-bold text-[var(--text-primary)] sm:text-base">Subtrack</h1>
              <p className="hidden text-[10px] uppercase tracking-widest text-[var(--text-muted)] sm:block">Smart Subscriptions</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHovered(link.label)}
                onMouseLeave={() => setHovered(null)}
                className="relative px-4 py-2 text-sm no-underline transition-colors"
                style={{ color: hovered === link.label ? "var(--accent-emerald)" : "var(--text-secondary)" }}
              >
                {link.label}
                {hovered === link.label && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 -z-10 rounded-xl"
                    style={{ background: "rgba(16,185,129,0.06)" }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Link to="/login"><Button variant="ghost">Log In</Button></Link>
            <Link to="/register"><Button variant="primary" className="!h-10 !px-5 !text-xs">Get Started</Button></Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-secondary)] md:hidden"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong mt-2 flex flex-col gap-1 rounded-2xl p-4 md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-[var(--text-secondary)] no-underline transition-colors hover:bg-white/[0.04] hover:text-[var(--text-primary)]"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex gap-3 border-t border-white/[0.06] pt-3">
              <Link to="/login" className="flex-1"><Button variant="ghost" className="!w-full">Log In</Button></Link>
              <Link to="/register" className="flex-1"><Button variant="primary" className="!w-full !text-xs">Get Started</Button></Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}

export default LandingNavbar;