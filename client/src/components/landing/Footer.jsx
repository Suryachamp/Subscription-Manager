import { motion } from "motion/react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy", "Terms", "Security"],
};

function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-12 pb-8 sm:pt-16">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5 md:gap-12">

          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-xl font-display text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }}
              >
                S
              </div>
              <span className="font-display text-base font-bold text-[var(--text-primary)]">Subtrack</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--text-muted)]">
              The smartest way to track and control all your recurring subscriptions.
            </p>
            <div className="mt-5 flex gap-2.5">
              {[FaGithub, FaTwitter, FaLinkedin].map((Icon, i) => (
                <motion.a
                  key={i} href="#"
                  whileHover={{ y: -2, scale: 1.1 }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/[0.03] text-sm text-[var(--text-muted)] transition-colors hover:text-emerald-400"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[var(--text-muted)] no-underline transition-colors hover:text-emerald-400">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-[var(--text-muted)] sm:mt-16 sm:flex-row sm:pt-8">
          <p>© 2026 Subtrack. All rights reserved.</p>
          <p>Built with <span className="text-emerald-400">♥</span> by Surya</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
