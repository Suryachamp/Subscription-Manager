import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSubscription } from "../../redux/subscriptionSlice";
import api from "../../api/axios";
import Button from "../../components/ui/Button";

function AddSubscription() {
  const dispatch = useDispatch(); // The walter;
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");

  // 1. The form state (we select some default values for the strict backend rules)
  const [formData,setFormData] = useState({
    platformName:"",
    category:"",
    price:"",
    currency:"USD",
    billingCycle:"Monthly",
    startDate: new Date().toISOString(), //today
    renewalDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(), // 1 month from now
    reminderDaysBefore: 3,
    paymentMethod: "CREDIT_CARD",
    paymentProvider: "User Bank",
    status:"ACTIVE",
    subscriptionSource: "MANUAL",
  });

  // 2. handle typing
  const handleChange = (e) => {
    // If they type in the price box, we need to convert it to a Number so the backend doesn't get mad!
    const value = e.target.name === "price" ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };


  // 3. Handle submit
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("");
    setSuccess("");

    try{
      // send to backend
      const response = await api.post("/subscriptions", formData);

      // Dispatch to redux vault;
      dispatch(addSubscription(response.data.subscription));

      setSuccess("subscription added successfully");

      // Reset the form so they can add another one
      setFormData({ ...formData, platformName: "", category: "", price: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

return (
    <div className="add-subscription-container glass-card rounded-3xl p-8 shadow-sm">
      <h2 className="add-subscription-title font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
        Add New Subscription
      </h2>
      <form onSubmit={handleSubmit} className="add-subscription-form space-y-4">
        {error && <div className="form-error-message rounded-lg bg-red-500/10 p-3 text-sm text-red-500">{error}</div>}
        {success && <div className="form-success-message rounded-lg bg-green-500/10 p-3 text-sm text-green-500">{success}</div>}
        <div className="form-grid grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Platform Name */}
          <div className="form-group-platform">
            <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Platform Name</label>
            <input type="text" name="platformName" value={formData.platformName} onChange={handleChange} placeholder="Netflix, Spotify..." className="form-input w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]" required />
          </div>
          {/* Category */}
          <div className="form-group-category">
            <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Entertainment, Music..." className="form-input w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]" required />
          </div>
          {/* Price */}
          <div className="form-group-price">
            <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Price (USD)</label>
            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} placeholder="15.99" className="form-input w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]" required />
          </div>
          {/* Billing Cycle */}
          <div className="form-group-billing-cycle">
            <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Billing Cycle</label>
            <select name="billingCycle" value={formData.billingCycle} onChange={handleChange} className="form-select w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]">
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
              <option value="WEEKLY">Weekly</option>
            </select>
          </div>
        </div>
        <Button variant="primary" type="submit" className="mt-6">
          Save Subscription
        </Button>
      </form>
    </div>
  );
}


export default AddSubscription;