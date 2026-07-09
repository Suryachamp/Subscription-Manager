import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { FaSpotify, FaGooglePlay, FaYoutube, FaRobot } from "react-icons/fa";
import { SiNetflix } from "react-icons/si";

const subs = [
  { icon: <SiNetflix />, name: "Netflix", amount: "₹649", color: "#e50914" },
  { icon: <FaSpotify />, name: "Spotify", amount: "₹119", color: "#1db954" },
  { icon: <FaRobot />, name: "ChatGPT Plus", amount: "₹1,700", color: "#10a37f" },
  { icon: <FaYoutube />, name: "YouTube Premium", amount: "₹189", color: "#ff0000" },
  { icon: <FaGooglePlay />, name: "Google One", amount: "₹249", color: "#4285f4" },
];

function WalletCard() {
  /* ── 3D tilt logic ── */
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });

  function handleMouse(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[400px] cursor-grab rounded-3xl border border-white/[0.06] p-6 sm:p-7"
      whileHover={{ scale: 1.02 }}
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={0.08}
    >
      {/* Card inner — pushed forward in 3D */}
      <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)]">
              Monthly Spending
            </p>
            <motion.h2
              className="mt-2 font-display text-3xl font-bold text-[var(--text-primary)] sm:text-4xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
            >
              ₹4,879
            </motion.h2>
          </div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5"
          >
            <span className="text-xs font-semibold text-emerald-400">● Active</span>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Subscription List */}
        <div className="space-y-2">
          {subs.map((sub, i) => (
            <motion.div
              key={sub.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.08 }}
              className="flex items-center justify-between rounded-xl px-3 py-2 transition-colors hover:bg-white/[0.03]"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
                  style={{ background: `${sub.color}18`, color: sub.color }}
                >
                  {sub.icon}
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)]">{sub.name}</span>
              </div>
              <span className="font-display text-sm font-semibold text-[var(--text-secondary)]">{sub.amount}</span>
            </motion.div>
          ))}
        </div>

        {/* Next Renewal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-5 overflow-hidden rounded-2xl p-4"
          style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }}
        >
          <p className="text-[11px] font-medium text-white/70">Next Renewal</p>
          <h3 className="mt-1 font-display text-base font-bold text-white">Netflix</h3>
          <p className="mt-0.5 text-sm text-white/80">Tomorrow • ₹649</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default WalletCard;