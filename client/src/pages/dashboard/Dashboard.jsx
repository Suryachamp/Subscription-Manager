import { useSelector } from "react-redux";
// 1. Import your brand new form component!
import AddSubscription from "../subscription/AddSubscription";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="font-display text-3xl font-bold text-[var(--text-primary)]">
        Welcome back, <span className="text-[var(--accent)]">{user?.name}</span>! 👋
      </h1>
      
      <p className="mt-2 text-[var(--text-secondary)] mb-8">
        Here is a quick overview of your subscriptions.
      </p>

      {/* We use a CSS grid to put the form on the right, and leave space on the left for the list later */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left side: (We will put the list of subscriptions here in the next step!) */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-3xl p-8 h-64 flex items-center justify-center border border-dashed border-[var(--border)]">
             <p className="text-[var(--text-secondary)]">Your subscription list will go here!</p>
          </div>
        </div>

        {/* Right side: This is where we display the form you just built! */}
        <div className="lg:col-span-1">
          <AddSubscription />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
