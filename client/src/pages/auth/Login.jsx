import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import Background from "../landing/Background";
import Button from "../../components/ui/Button";
import api from "../../api/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { useState } from "react";

/**
 * Login Page
 * 
 * A static UI for the login screen. It uses the shared Background component
 * and a glassmorphic card to match the landing page theme.
 */
function Login() {

  const[formData, setFormData] = useState({
    email:"",
    password:""
  });
  const[error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();  // This will talk to the redux 

  // Function to update state when typing
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to send data to the backend
  const handleLogin = async (e) =>{
    e.preventDefault();
    setError("");

    try{
      // This sends data to the backend 
      const response = await api.post("/auth/login", formData);
      
      // The backend says "Success!" and gives us the user data.
      // We DISPATCH that data to our Redux Vault so the whole app knows!
      dispatch(loginSuccess(response.data.user));
    
      // after the data being sent to the whole site we will redirect to the dashboard
      navigate("/dashboard")
    }catch(error){
      setError(error.response?.data?.message || "Invalid email or password");
    }
  }

  return (
    <div className="login-page-container relative flex min-h-screen flex-col items-center overflow-x-hidden overflow-y-auto bg-[var(--bg-primary)] px-5 py-10">
      <Background />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="login-card-container glass-card w-full max-w-[400px] rounded-3xl p-8 sm:p-10 z-10 my-auto"
      >
        {/* Logo/Header */}
        <div className="login-header-section mb-8 text-center">
          <Link to="/" className="login-logo-link inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] font-display text-xl font-bold text-white shadow-sm mb-4">
            S
          </Link>
          <h2 className="login-title font-display text-2xl font-bold text-[var(--text-primary)]">Welcome back</h2>
          <p className="login-subtitle mt-2 text-sm text-[var(--text-secondary)]">
            Enter your details to access your dashboard.
          </p>
        </div>

        {/* Form (Static) */}
        <form className="login-form space-y-4" onSubmit={handleLogin}>
          <div className="form-group-email">
            <label className="form-label-email mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="you@example.com"
              className="form-input-email w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] shadow-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>

          <div className="form-group-password">
            <div className="form-label-password-container mb-1.5 flex items-center justify-between">
              <label className="form-label-password block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Password
              </label>
              <a href="#" className="forgot-password-link text-xs font-medium text-[var(--accent)] hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="••••••••"
              className="form-input-password w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] shadow-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>

          <Button variant="primary" type="submit" className="login-submit-button !mt-8 w-full">
            Log In
          </Button>
        </form>

        {/* Footer link */}
        <p className="login-footer-text mt-6 text-center text-sm text-[var(--text-secondary)]">
          Don't have an account?{" "}
          <Link to="/register" className="signup-link font-semibold text-[var(--accent)] hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;