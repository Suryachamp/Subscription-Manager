import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Background from "../landing/Background";
import Button from "../../components/ui/Button";

/**
 * Register Page
 * 
 * A static UI for the account creation screen. It uses the shared Background component
 * and a glassmorphic card to match the landing page theme.
 */
function Register() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-primary)] px-5">
      <Background />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card w-full max-w-[400px] rounded-3xl p-8 sm:p-10 z-10 my-10"
      >
        {/* Logo/Header */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] font-display text-xl font-bold text-white shadow-sm mb-4">
            S
          </Link>
          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">Create an account</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Start taking control of your subscriptions today.
          </p>
        </div>

        {/* Form (Static) */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] shadow-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] shadow-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a strong password"
              className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] shadow-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
            <p className="mt-2 text-xs text-[var(--text-muted)]">Must be at least 8 characters long.</p>
          </div>

          <Button variant="primary" type="submit" className="!mt-8 w-full">
            Create Account
          </Button>
        </form>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-[var(--accent)] hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;