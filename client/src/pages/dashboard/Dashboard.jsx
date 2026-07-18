import { useSelector, useDispatch } from "react-redux";
// 1. Import your brand new form component!
import AddSubscription from "../subscription/AddSubscription";
import { useEffect } from "react";
import { setSubscriptions } from "../../redux/subscriptionSlice";
import api from "../../api/axios";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  // Grab the list of subscriptions from the redux vault!
  const {subscriptions} = useSelector((state) => state.subscriptions);
  const dispatch = useDispatch();

  // The Alarm clock: Run this code automatically when the page loads 
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        // 1. Ask the backend for the users data
        const response = await api.get("/subscriptions");

        // 2. The backend sends it back. Hand it to the walter to put in the vault
        dispatch(setSubscriptions(response.data.subscriptions));
      } catch (error) {
        console.error("failed to fetch subscription", error);
      }
    };
    fetchSubscription();
  }, [dispatch]);

  return (
    <div className="dashboard-container p-8 max-w-7xl mx-auto">
      <h1 className="dashboard-greeting font-display text-3xl font-bold text-[var(--text-primary)]">
        Welcome back, <span className="text-[var(--accent)]">{user?.name}</span>! 👋
      </h1>
      
      <p className="dashboard-description mt-2 text-[var(--text-secondary)] mb-8">
        Here is a quick overview of your subscriptions.
      </p>
      <div className="dashboard-layout-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left side: The Subscription List */}
        <div className="subscription-list-section lg:col-span-2 space-y-4">
          <h2 className="subscription-list-title font-display text-xl font-bold text-[var(--text-primary)] mb-4">Your Active Plans</h2>
          
          {/* If they have no subscriptions, show a friendly message */}
          {subscriptions.length === 0 ? (
            <div className="empty-state-card glass-card rounded-3xl p-8 flex items-center justify-center border border-dashed border-[var(--border)]">
              <p className="empty-state-text text-[var(--text-secondary)]">You don't have any subscriptions yet. Add one!</p>
            </div>
          ) : (
            /* If they DO have subscriptions, loop through them and draw a card for each one! */
            subscriptions.map((sub) => (
              <div key={sub.id} className="subscription-card glass-card rounded-2xl p-6 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                <div className="subscription-card-left">
                  <h3 className="subscription-platform-name font-bold text-lg text-[var(--text-primary)]">{sub.platformName}</h3>
                  <p className="subscription-category-date text-sm text-[var(--text-secondary)]">{sub.category} • Renews on {new Date(sub.renewalDate).toLocaleDateString()}</p>
                </div>
                <div className="subscription-card-right text-right">
                  <p className="subscription-price font-bold text-xl text-[var(--accent)]">${sub.price}</p>
                  <p className="subscription-cycle text-xs text-[var(--text-muted)]">/{sub.billingCycle.toLowerCase()}</p>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Right side: The Add Form */}
        <div className="add-subscription-section lg:col-span-1">
          <AddSubscription />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
