import { motion } from "motion/react";

function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}) {
  const base =
    "relative inline-flex items-center justify-center rounded-xl px-7 h-12 font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer";

  const variants = {
    primary: `bg-[var(--accent)] text-white shadow-sm hover:shadow-md
      hover:-translate-y-0.5 active:scale-[0.97]`,

    secondary: `bg-white text-[var(--text-primary)] shadow-sm
      border border-[var(--border)]
      hover:border-[var(--border-hover)] hover:bg-slate-50
      hover:-translate-y-0.5 active:scale-[0.97]`,

    ghost: `bg-transparent text-[var(--text-secondary)]
      hover:text-[var(--text-primary)] hover:bg-slate-100`,
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

export default Button;