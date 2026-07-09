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
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 20 });

  function handleMouse(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card w-full max-w-[420px] cursor-grab rounded-3xl p-6 sm:p-8 relative z-10"
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={0.06}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Monthly Spend</p>
          <h2 className="mt-1 font-display text-4xl font-bold tracking-tight text-[var(--text-primary)]">₹4,879</h2>
        </div>
        <div className="rounded-full bg-[var(--accent-soft)] px-3 py-1.5 border border-[var(--accent)]/10">
          <span className="text-xs font-semibold text-[var(--accent)]">● Active</span>
        </div>
      </div>

      <div className="my-6 h-px bg-slate-200/60" />

      {/* List */}
      <div className="space-y-2">
        {subs.map((sub, i) => (
          <motion.div
            key={sub.name}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.05 }}
            className="flex items-center justify-between rounded-xl px-2 py-2 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-lg shadow-sm ring-1 ring-black/5 bg-white/80"
                style={{ color: sub.color }}
              >
                {sub.icon}
              </div>
              <span className="text-sm font-semibold text-[var(--text-primary)]">{sub.name}</span>
            </div>
            <span className="font-display text-sm font-semibold text-[var(--text-secondary)]">{sub.amount}</span>
          </motion.div>
        ))}
      </div>

      {/* Next Renewal */}
      <div className="mt-6 flex items-center justify-between rounded-2xl bg-[var(--accent-soft)] p-5 border border-[var(--accent)]/5">
        <div>
          <p className="text-xs font-medium text-[var(--accent)]">Next Renewal</p>
          <h3 className="mt-1 font-display text-lg font-bold text-[var(--text-primary)]">Netflix</h3>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-[var(--text-secondary)]">Tomorrow</p>
          <p className="font-display text-lg font-bold text-[var(--text-primary)]">₹649</p>
        </div>
      </div>
    </motion.div>
  );
}

export default WalletCard;