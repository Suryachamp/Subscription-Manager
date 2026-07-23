import { useSelector, useDispatch } from "react-redux";
import AddSubscription from "../subscription/AddSubscription";
import { useEffect, useState } from "react";
import { setSubscriptions, removeSubscription } from "../../redux/subscriptionSlice";
import api from "../../api/axios";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import PlaidConnect from "../../components/plaid/PlaidConnect";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const { subscriptions } = useSelector((state) => state.subscriptions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // We no longer need local state for Plaid! They go straight to the DB.
  const fetchSubscriptions = async () => {
    try {
      const response = await api.get("/subscriptions");
      dispatch(setSubscriptions(response.data.subscriptions));
    } catch (error) {
      console.error("Failed to fetch subscriptions", error);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Even if the api call fails, log out locally anyway
    }
    dispatch(logout());
    navigate("/login");
  };

  // Fetch all subscriptions (manual + Plaid) when dashboard loads
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      try {
        await api.delete(`/subscriptions/${id}`);
        dispatch(removeSubscription(id));
      } catch (error) {
        console.error("Failed to delete subscription:", error);
        alert("Failed to delete subscription. Please try again.");
      }
    }
  };

  return (
    <div className="dashboard-container p-8 max-w-7xl mx-auto">

      {/* Dashboard Header */}
      <div className="dashboard-header flex items-start justify-between mb-8">
        <div className="dashboard-header-text">
          <h1 className="dashboard-greeting font-display text-3xl font-bold text-[var(--text-primary)]">
            Welcome back, <span className="text-[var(--accent)]">{user?.name}</span>! 👋
          </h1>
          <p className="dashboard-description mt-2 text-[var(--text-secondary)]">
            Here is a quick overview of your subscriptions.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="logout-button rounded-xl border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--text-secondary)] shadow-sm transition-all hover:border-red-400 hover:text-red-500"
        >
          Logout
        </button>
      </div>

      <div className="dashboard-layout-grid grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left side: Manual + Plaid Subscriptions */}
        <div className="subscription-list-section lg:col-span-2 space-y-4">

          {/* ── Section 1: Manual Subscriptions ── */}
          <h2 className="subscription-list-title font-display text-xl font-bold text-[var(--text-primary)] mb-4">
            📝 Your Active Plans
          </h2>

          {subscriptions.length === 0 ? (
            <div className="empty-state-card glass-card rounded-3xl p-8 flex items-center justify-center border border-dashed border-[var(--border)]">
              <p className="empty-state-text text-[var(--text-secondary)]">
                You don't have any subscriptions yet. Add one!
              </p>
            </div>
          ) : (
            subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="subscription-card glass-card rounded-2xl p-6 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="subscription-card-left">
                  <h3 className="subscription-platform-name font-bold text-lg text-[var(--text-primary)]">
                    {sub.platformName}
                  </h3>
                  <p className="subscription-category-date text-sm text-[var(--text-secondary)]">
                    {sub.category} • Renews on {new Date(sub.renewalDate).toLocaleDateString()} 
                    {sub.subscriptionSource === 'PLAID' && ' 🏦 (Auto-Detected)'}
                  </p>
                </div>
                <div className="subscription-card-right text-right flex flex-col items-end gap-2">
                  <div>
                    <p className="subscription-price font-bold text-xl text-[var(--accent)]">
                      ${sub.price}
                    </p>
                    <p className="subscription-cycle text-xs text-[var(--text-muted)]">
                      /{sub.billingCycle.toLowerCase()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="text-xs text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

          {/* ── Section 2: Plaid Auto-Detected ── */}
          <div className="plaid-section mt-10">
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-4">
              🏦 Auto-Detected from Bank
            </h2>

            {/* This button fetches a link_token, opens Plaid widget, then tells Dashboard to fetch the updated DB list */}
            <PlaidConnect onSubscriptionsImported={fetchSubscriptions} />
          </div>

        </div>

        {/* Right side: Add Subscription Form */}
        <div className="add-subscription-section lg:col-span-1">
          <AddSubscription />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
