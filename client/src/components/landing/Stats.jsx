import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 10000, suffix: "+", label: "Active Users", color: "#10b981" },
  { value: 50, suffix: "L+", label: "Rupees Tracked", prefix: "₹", color: "#06b6d4" },
  { value: 99.9, suffix: "%", label: "Uptime", color: "#8b5cf6" },
  { value: 50, suffix: "+", label: "Platforms", color: "#f59e0b" },
];

function Counter({ value, prefix = "", suffix = "", color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const steps = 50;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCount(value * (1 - Math.pow(1 - step / steps, 3)));
      if (step >= steps) { setCount(value); clearInterval(timer); }
    }, 30);
    return () => clearInterval(timer);
  }, [inView, value]);

  const display = value % 1 !== 0 ? count.toFixed(1) : Math.floor(count).toLocaleString();

  return (
    <span ref={ref} className="font-display text-4xl font-bold sm:text-5xl" style={{ color }}>
      {prefix}{display}{suffix}
    </span>
  );
}

function Stats() {
  return (
    <section id="stats" className="relative py-16 sm:py-24">
      <div className="mx-auto mb-10 h-px max-w-xs bg-gradient-to-r from-transparent via-white/10 to-transparent sm:max-w-3xl sm:mb-16" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center font-display text-3xl font-bold text-[var(--text-primary)] sm:mb-16 sm:text-4xl"
        >
          Trusted by <span className="text-gradient">thousands</span>
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 text-center sm:p-8"
            >
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} color={s.color} />
              <p className="mt-2 text-xs text-[var(--text-muted)] sm:text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 h-px max-w-xs bg-gradient-to-r from-transparent via-white/10 to-transparent sm:max-w-3xl sm:mt-16" />
    </section>
  );
}

export default Stats;
