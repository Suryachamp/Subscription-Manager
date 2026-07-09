import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "../../ui/Button";

const links = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#cta" },
];

function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 shadow-sm backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="flex h-16 items-center justify-between px-2 sm:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent)] font-display text-sm font-bold text-white sm:h-9 sm:w-9 shadow-sm">
              S
            </div>
            <div>
              <h1 className="font-display text-base font-bold text-[var(--text-primary)] sm:text-lg">Subtrack</h1>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--text-primary)]"
              >
                {link.label}
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
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--text-secondary)] hover:bg-slate-100 md:hidden"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex flex-col gap-1 rounded-2xl bg-white p-4 shadow-lg border border-[var(--border)] md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--text-secondary)] no-underline transition-colors hover:bg-slate-50 hover:text-[var(--text-primary)]"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex gap-3 border-t border-[var(--border)] pt-4">
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