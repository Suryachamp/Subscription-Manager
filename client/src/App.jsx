import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "./redux/authSlice";
import api from "./api/axios";
import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  // WHY useEffect here and not in Dashboard?
  // Because App.jsx is the FIRST component that loads. We need to check the
  // cookie BEFORE any page (including the Security Guard) tries to render.
  // The [] at the end means: run this code ONCE when the app first opens.
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Silently ask the backend: "Hey, does my browser have a valid cookie?"
        const response = await api.get("/auth/me");

        // Yes! Cookie is valid. Restore the user to the Redux vault.
        // This is what keeps you logged in after a page refresh!
        dispatch(loginSuccess(response.data.user));
      } catch {
        // No valid cookie. User is not logged in.
        // Dispatch logout to set loading=false so ProtectedRoute can redirect.
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
