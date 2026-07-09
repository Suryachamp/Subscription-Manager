import { motion } from "motion/react";

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Grid Pattern */}
      <div className="bg-grid absolute inset-0" />

      {/* Warm Rose Orb — top left */}
      <motion.div
        animate={{ x: [0, 70, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 -top-32 h-[550px] w-[550px] rounded-full animate-morph"
        style={{
          background:
            "radial-gradient(circle, rgba(244,63,94,0.1) 0%, rgba(245,158,11,0.05) 40%, transparent 70%)",
        }}
      />

      {/* Violet Orb — center right */}
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full animate-morph"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(236,72,153,0.04) 40%, transparent 70%)",
          animationDelay: "-4s",
        }}
      />

      {/* Emerald Orb — bottom center */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full animate-morph"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
          animationDelay: "-8s",
        }}
      />

      {/* Amber Orb — top right */}
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Floating particles — multi-colored */}
      {[
        { color: "bg-rose-400/30", left: "10%", top: "15%" },
        { color: "bg-amber-400/25", left: "25%", top: "45%" },
        { color: "bg-violet-400/30", left: "40%", top: "25%" },
        { color: "bg-emerald-400/25", left: "60%", top: "55%" },
        { color: "bg-cyan-400/20", left: "75%", top: "20%" },
        { color: "bg-pink-400/25", left: "85%", top: "65%" },
        { color: "bg-amber-400/20", left: "50%", top: "75%" },
        { color: "bg-rose-400/20", left: "15%", top: "70%" },
      ].map((p, i) => (
        <motion.div
          key={i}
          className={`absolute h-1 w-1 rounded-full ${p.color}`}
          style={{ left: p.left, top: p.top }}
          animate={{
            y: [0, -(20 + i * 5), 0],
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3.5 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Gradient edge lines */}
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(244,63,94,0.25), rgba(139,92,246,0.25), transparent)",
        }}
      />
    </div>
  );
}

export default Background;