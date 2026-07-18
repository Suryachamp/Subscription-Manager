import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import Background from "../landing/Background";
import Button from "../../components/ui/Button";
import { useState } from "react";
import api from "../../api/axios"

/**
 * Register Page
 * 
 * A static UI for the account creation screen. It uses the shared Background component
 * and a glassmorphic card to match the landing page theme.
 */
function Register() {
  // 1. Set up state to track the inputs
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 2. Function to update state when the user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Function to send data to the backend when they submit
  const handleRegister = async (e) => {
    e.preventDefault(); // Stop the page from refreshing
    setError(""); // Clear old errors

    try {
      // Send the data to the backend!
      const response = await api.post('/auth/register', formData);
      
      // If successful, send them to the login page so they can log in
      navigate("/login");
    } catch (err) {
      // If the backend rejects it (e.g. email already exists), show the error
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="register-page-container relative flex min-h-screen flex-col items-center overflow-x-hidden overflow-y-auto bg-[var(--bg-primary)] px-5 py-10">
      <Background />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="register-card-container glass-card w-full max-w-[400px] rounded-3xl p-8 sm:p-10 z-10 my-auto"
      >
        {/* Logo/Header */}
        <div className="register-header-section mb-8 text-center">
          <Link to="/" className="register-logo-link inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] font-display text-xl font-bold text-white shadow-sm mb-4">
            S
          </Link>
          <h2 className="register-title font-display text-2xl font-bold text-[var(--text-primary)]">Create an account</h2>
          <p className="register-subtitle mt-2 text-sm text-[var(--text-secondary)]">
            Start taking control of your subscriptions today.
          </p>
        </div>

        {/* Form (Static) */}
        <form className="register-form space-y-4" onSubmit={handleRegister}>
          {error && (
            <div className="form-error-message rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
              {error}
            </div>
          )}
          <div className="form-group-name">
            <label className="form-label-name mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Full Name
            </label>
            <input
              type="text"
              name="name"  
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="form-input-name w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] shadow-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>

          <div className="form-group-email">
            <label className="form-label-email mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="form-input-email w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] shadow-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>

          <div className="form-group-password">
            <label className="form-label-password mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              className="form-input-password w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] shadow-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
            <p className="password-hint mt-2 text-xs text-[var(--text-muted)]">Must be at least 8 characters long.</p>
          </div>

          <Button variant="primary" type="submit" className="register-submit-button !mt-8 w-full">
            Create Account
          </Button>
        </form>

        {/* Footer link */}
        <p className="register-footer-text mt-6 text-center text-sm text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Link to="/login" className="login-link font-semibold text-[var(--accent)] hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;