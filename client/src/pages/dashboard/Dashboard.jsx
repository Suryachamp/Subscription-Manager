import { useSelector, useDispatch } from "react-redux";
import AddSubscription from "../subscription/AddSubscription";
import { useEffect, useState } from "react";
import { setSubscriptions, removeSubscription, updateSubscriptionInStore } from "../../redux/subscriptionSlice";
import api from "../../api/axios";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import PlaidConnect from "../../components/plaid/PlaidConnect";
import { io } from "socket.io-client";

const getCurrencySymbol = (currency) => {
  switch (currency) {
    case 'INR': return '₹';
    case 'EUR': return '€';
    case 'GBP': return '£';
    default: return '$';
  }
};

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const { subscriptions } = useSelector((state) => state.subscriptions);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(null);
  const [editingSub, setEditingSub] = useState(null); // The subscription being edited (null = modal closed)

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

  useEffect(() => {
    if (!user?.id) return;

    // Connect to the backend socket, passing our User ID
    const socket = io("http://localhost:5000", {
      query: { userId: user.id }
    });

    // Listen for the 'new_notification' event we created in the cron job!
    socket.on("new_notification", (data) => {
      setAlertMessage(data.message);
      
      // Auto-hide the alert after 5 seconds
      setTimeout(() => setAlertMessage(null), 5000);
    });

    return () => socket.disconnect(); // Clean up when user logs out
  }, [user]);


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

  const handleToggleAutopay = async (id) => {
    try {
      const response = await api.patch(`/subscriptions/${id}/autopay`);
      dispatch(updateSubscriptionInStore(response.data.subscription));
    } catch (error) {
      console.error("Failed to toggle autopay:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...editingSub,
        startDate: new Date(editingSub.startDate).toISOString(),
        renewalDate: new Date(editingSub.renewalDate).toISOString(),
      };
      const response = await api.put(`/subscriptions/${editingSub.id}`, payload);
      dispatch(updateSubscriptionInStore(response.data.subscription));
      setEditingSub(null); // Close the modal
    } catch (error) {
      console.error("Failed to update subscription:", error);
      alert("Failed to update. Please try again.");
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
                className="subscription-card glass-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="subscription-card-left">
                    <h3 className="subscription-platform-name font-bold text-lg text-[var(--text-primary)]">
                      {sub.platformName}
                    </h3>
                    <p className="subscription-category-date text-sm text-[var(--text-secondary)]">
                      {sub.category} • Renews on {new Date(sub.renewalDate).toLocaleDateString()} 
                      {sub.subscriptionSource === 'PLAID' && ' 🏦 (Auto-Detected)'}
                    </p>
                  </div>
                  <div className="subscription-card-right text-right">
                    <p className="subscription-price font-bold text-xl text-[var(--accent)]">
                      {getCurrencySymbol(sub.currency)}{sub.price}
                    </p>
                    <p className="subscription-cycle text-xs text-[var(--text-muted)]">
                      /{sub.billingCycle.toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Autopay Toggle + Action Buttons */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border)]">
                  {/* Autopay Toggle */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <div
                      onClick={() => handleToggleAutopay(sub.id)}
                      className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${sub.autopay ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${sub.autopay ? 'translate-x-5' : ''}`} />
                    </div>
                    <span className={`text-xs font-medium ${sub.autopay ? 'text-green-600' : 'text-[var(--text-muted)]'}`}>
                      Autopay {sub.autopay ? 'ON' : 'OFF'}
                    </span>
                  </label>

                  {/* Edit & Delete Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingSub({
                        ...sub,
                        startDate: new Date(sub.startDate).toISOString().split('T')[0],
                        renewalDate: new Date(sub.renewalDate).toISOString().split('T')[0],
                      })}
                      className="text-xs text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sub.id)}
                      className="text-xs text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </div>
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

      {/* ── Edit Subscription Modal ── */}
      {editingSub && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setEditingSub(null)}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
              Edit Subscription
            </h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Platform Name</label>
                  <input type="text" value={editingSub.platformName} onChange={(e) => setEditingSub({...editingSub, platformName: e.target.value})} className="form-input w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]" required />
                </div>
                <div>
                  <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Category</label>
                  <input type="text" value={editingSub.category} onChange={(e) => setEditingSub({...editingSub, category: e.target.value})} className="form-input w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]" required />
                </div>
                <div>
                  <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Price</label>
                  <input type="number" step="0.01" value={editingSub.price} onChange={(e) => setEditingSub({...editingSub, price: Number(e.target.value)})} className="form-input w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]" required />
                </div>
                <div>
                  <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Billing Cycle</label>
                  <select value={editingSub.billingCycle} onChange={(e) => setEditingSub({...editingSub, billingCycle: e.target.value})} className="form-select w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]">
                    <option value="MONTHLY">Monthly</option>
                    <option value="YEARLY">Yearly</option>
                    <option value="WEEKLY">Weekly</option>
                  </select>
                </div>
                <div>
                  <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Currency</label>
                  <select value={editingSub.currency || "USD"} onChange={(e) => setEditingSub({...editingSub, currency: e.target.value})} className="form-select w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Start Date</label>
                  <input type="date" value={editingSub.startDate} onChange={(e) => setEditingSub({...editingSub, startDate: e.target.value})} className="form-input w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]" required />
                </div>
                <div>
                  <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Renewal Date</label>
                  <input type="date" value={editingSub.renewalDate} onChange={(e) => setEditingSub({...editingSub, renewalDate: e.target.value})} className="form-input w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]" required />
                </div>
                <div>
                  <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Reminder (Days Before)</label>
                  <input type="number" min="1" max="30" value={editingSub.reminderDaysBefore} onChange={(e) => setEditingSub({...editingSub, reminderDaysBefore: Number(e.target.value)})} className="form-input w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]" required />
                </div>
                <div>
                  <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Payment Method</label>
                  <select value={editingSub.paymentMethod} onChange={(e) => setEditingSub({...editingSub, paymentMethod: e.target.value})} className="form-select w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]">
                    <option value="CREDIT_CARD">Credit Card</option>
                    <option value="DEBIT_CARD">Debit Card</option>
                    <option value="PAYPAL">PayPal</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                    <option value="UPI">UPI</option>
                    <option value="PHONEPE">PhonePe</option>
                    <option value="GPAY">Google Pay</option>
                    <option value="PAYTM">Paytm</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button type="submit" className="flex-1 bg-[var(--accent)] text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity">
                  Save Changes
                </button>
                <button type="button" onClick={() => setEditingSub(null)} className="flex-1 border border-[var(--border)] text-[var(--text-secondary)] font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Real-time WebSocket Alert Popup */}
      {alertMessage && (
        <div className="fixed top-5 right-5 bg-orange-500 text-white px-6 py-4 rounded-xl shadow-lg font-bold z-50 animate-bounce">
          🔔 {alertMessage}
        </div>
      )}

    </div>
    
  );
}

export default Dashboard;
