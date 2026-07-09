import { motion } from "motion/react";
import Button from "../ui/Button";
import WalletCard from "../common/cards/WalletCard";
import Background from "../../pages/landing/Background";
import { FaArrowRight } from "react-icons/fa";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <Background />

      <div className="relative mx-auto max-w-7xl px-5 pt-28 pb-8 sm:px-8 sm:pt-32">

        {/* ── Text — centered ── */}
        <div className="text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 sm:mb-8 sm:px-5 sm:py-2"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(244,63,94,0.08))",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #f43f5e)" }}
            />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em] sm:text-xs"
              style={{
                background: "linear-gradient(90deg, #c084fc, #fb7185)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Now in Public Beta
            </span>
          </motion.div>

          {/* Title */}
          <div className="font-display font-bold leading-[0.95]">
            <motion.div
              initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl text-[var(--text-primary)] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Never lose track of
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #f43f5e, #f59e0b, #10b981, #8b5cf6)",
                  backgroundSize: "300% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "text-gradient 5s linear infinite",
                }}
              >
                a single rupee
              </span>
              <span className="text-[var(--text-primary)]"> again.</span>
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mx-auto mt-6 max-w-xl px-2 text-base leading-7 text-[var(--text-secondary)] sm:mt-8 sm:text-lg sm:leading-8"
          >
            One dashboard to track every subscription, visualize spending
            patterns, get renewal reminders, and kill the ones bleeding you dry.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
          >
            <Button variant="primary">
              Start Tracking — It's Free <FaArrowRight className="text-xs" />
            </Button>
            <Button variant="secondary">Watch Demo</Button>
          </motion.div>

          {/* Trust Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-4 sm:mt-8 sm:gap-6"
          >
            {["No credit card", "Free forever plan", "30s setup"].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: ["#f43f5e", "#f59e0b", "#10b981"][i] }}
                />
                <span className="text-xs text-[var(--text-muted)]">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Wallet Card — centered below ── */}
        <div className="relative mt-12 flex justify-center sm:mt-16" style={{ perspective: "1200px" }}>
          {/* Glow behind card */}
          <div
            className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 sm:h-[400px] sm:w-[600px]"
            style={{
              background: "radial-gradient(ellipse, rgba(139,92,246,0.12), rgba(244,63,94,0.06) 40%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <WalletCard />

          {/* Floating accents — hidden on small screens */}
          {[
            { emoji: "🔥", pos: "-left-4 top-8 sm:-left-8 sm:top-12", delay: 0, dy: -18 },
            { emoji: "💸", pos: "-right-2 top-20 sm:-right-4 sm:top-24", delay: 1, dy: 14 },
            { emoji: "📊", pos: "-left-8 bottom-8 sm:-left-16 sm:bottom-8", delay: 2, dy: -12 },
            { emoji: "🔔", pos: "-right-6 bottom-12 sm:-right-12 sm:bottom-16", delay: 0.5, dy: 10 },
          ].map(({ emoji, pos, delay, dy }) => (
            <motion.div
              key={emoji}
              animate={{ y: [0, dy, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
              className={`absolute hidden items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-xl backdrop-blur-sm sm:flex h-12 w-12 ${pos}`}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: "linear-gradient(to top, var(--bg-primary), transparent)" }}
      />
    </section>
  );
}

export default Hero;