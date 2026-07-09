import { motion } from "motion/react";
import Button from "../ui/Button";
import { FaArrowRight } from "react-icons/fa";

function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden py-20 sm:py-32">
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="mb-5 inline-block rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">
            Get Started Today
          </span>

          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl lg:text-6xl">
            Ready to{" "}
            <span className="text-gradient">stop overpaying</span>
            <br />for subscriptions?
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-[var(--text-secondary)] sm:mt-6 sm:text-base">
            Join thousands of users who save money every month by keeping track of exactly where their money goes.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
          >
            <Button variant="primary">Create Free Account <FaArrowRight className="text-xs" /></Button>
            <Button variant="secondary">View Demo</Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-2">
              {["#10b981", "#06b6d4", "#8b5cf6", "#f43f5e"].map((c, i) => (
                <div key={i} className="h-7 w-7 rounded-full border-2 border-[var(--bg-primary)] sm:h-8 sm:w-8" style={{ background: `${c}40` }} />
              ))}
            </div>
            <p className="text-xs text-[var(--text-muted)] sm:text-sm">
              <span className="font-semibold text-[var(--text-secondary)]">2,400+</span> joined this week
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;