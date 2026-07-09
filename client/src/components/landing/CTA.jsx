import { motion } from "motion/react";
import Button from "../ui/Button";
import { FaArrowRight } from "react-icons/fa";

function CTA() {
  return (
    <section id="cta" className="relative bg-[var(--bg-secondary)] py-20 sm:py-32 border-t border-[var(--border)]">
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="mb-5 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--accent)] shadow-sm ring-1 ring-[var(--border)]">
            Get Started Today
          </span>

          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl">
            Ready to stop <span className="text-[var(--accent)]">overpaying</span>
            <br />for subscriptions?
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[var(--text-secondary)]">
            Join thousands of users who save money every month by keeping track of exactly where their money goes.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
          >
            <Button variant="primary" className="!h-12 !px-8">Create Free Account <FaArrowRight className="ml-2 text-xs" /></Button>
            <Button variant="secondary" className="!h-12 !px-8">View Demo</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <div className="flex -space-x-3">
              {[0.1, 0.2, 0.4, 0.6].map((o, i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-[var(--accent)]"
                  style={{ opacity: o }} />
              ))}
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              <span className="font-bold text-[var(--text-primary)]">2,400+</span> joined this week
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;