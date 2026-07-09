import { motion } from "motion/react";

function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}) {
  const base =
    "relative inline-flex items-center justify-center rounded-2xl px-8 h-14 font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer overflow-hidden";

  const variants = {
    primary: `bg-gradient-to-r from-emerald-500 to-cyan-500 text-white
      shadow-[0_0_30px_rgba(16,185,129,0.25)]
      hover:shadow-[0_0_50px_rgba(16,185,129,0.4)]
      hover:-translate-y-1
      active:scale-[0.97]`,

    secondary: `bg-transparent text-[var(--text-primary)]
      border border-[var(--border-hover)]
      hover:border-emerald-500/40
      hover:bg-emerald-500/5
      hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]
      hover:-translate-y-1
      active:scale-[0.97]`,

    ghost: `bg-transparent text-[var(--text-secondary)]
      hover:text-[var(--text-primary)]
      hover:bg-white/5`,
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {/* Shimmer overlay on primary */}
      {variant === "primary" && (
        <span className="absolute inset-0 overflow-hidden rounded-2xl">
          <span
            className="absolute inset-0 -translate-x-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              animation: "shimmer 3s ease-in-out infinite",
            }}
          />
        </span>
      )}

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

export default Button;