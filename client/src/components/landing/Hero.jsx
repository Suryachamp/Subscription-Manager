import { motion } from "motion/react";
import Button from "../ui/Button";
import WalletCard from "../common/cards/WalletCard";
import Background from "../../pages/landing/Background";
import { FaArrowRight } from "react-icons/fa";

/**
 * Hero Section Component
 * 
 * This is the first thing users see when they open the website (the "above the fold" area).
 * It contains the main headline, subtitle, call-to-action buttons, and the interactive Wallet Card.
 * We use 'framer-motion' (imported as motion) to add slide-up animations to the text.
 */
function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)]">
      <Background />

      <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-8 sm:px-8 sm:pt-40">
        <div className="text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/10 bg-[var(--accent-soft)] px-4 py-1.5 sm:mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span className="text-[11px] font-semibold tracking-wide text-[var(--accent)] sm:text-xs">
              Subtrack 1.0 is now live
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl lg:text-[72px] lg:leading-[1.1]"
          >
            Manage your subscriptions
            <br />
            with <span className="text-[var(--accent)]">absolute clarity.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:mt-8 sm:text-xl"
          >
            A clean, powerful dashboard to track every subscription, visualize spending
            patterns, and kill the ones you don't need.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
          >
            <Button variant="primary" className="!h-14 !px-8 !text-base">
              Start Tracking For Free <FaArrowRight className="ml-2 text-xs" />
            </Button>
            <Button variant="secondary" className="!h-14 !px-8 !text-base">
              See How It Works
            </Button>
          </motion.div>
        </div>

        {/* Card */}
        <div className="relative mt-16 flex justify-center sm:mt-24" style={{ perspective: "1200px" }}>
          <WalletCard />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: "linear-gradient(to top, var(--bg-primary), transparent)" }}
      />
    </section>
  );
}

export default Hero;