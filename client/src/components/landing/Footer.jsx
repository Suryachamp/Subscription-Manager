import { motion } from "motion/react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy", "Terms", "Security"],
};

function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--border)] pt-12 pb-8 sm:pt-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5 md:gap-12">

          <div className="sm:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent)] font-display text-sm font-bold text-white shadow-sm">
                S
              </div>
              <span className="font-display text-base font-bold text-[var(--text-primary)]">Subtrack</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--text-secondary)]">
              The smartest way to track and control all your recurring subscriptions. No more surprise charges.
            </p>
            <div className="mt-6 flex gap-3">
              {[FaGithub, FaTwitter, FaLinkedin].map((Icon, i) => (
                <motion.a key={i} href="#" whileHover={{ y: -2 }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-slate-50 text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--accent)] hover:shadow-sm">
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm font-medium text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--accent)]">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 text-sm font-medium text-[var(--text-secondary)] sm:flex-row">
          <p>© 2026 Subtrack. All rights reserved.</p>
          <p>Built with <span className="text-[var(--accent)]">♥</span> by Surya</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
