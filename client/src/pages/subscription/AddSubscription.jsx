import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSubscription } from "../../redux/subscriptionSlice";
import api from "../../api/axios";
import Button from "../../components/ui/Button";

function AddSubscription() {
  const dispatch = useDispatch(); // The walter;
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");

  // 1. The form state
  const today = new Date().toISOString().split('T')[0];
  const nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0];

  const [formData,setFormData] = useState({
    platformName:"",
    category:"",
    price:"",
    currency:"USD",
    billingCycle:"MONTHLY",
    startDate: today,
    renewalDate: nextMonth,
    reminderDaysBefore: 3,
    paymentMethod: "CREDIT_CARD",
    paymentProvider: "",
    status:"ACTIVE",
    subscriptionSource: "MANUAL",
  });

  // 2. handle typing
  const handleChange = (e) => {
    // Convert to number for specific fields
    const value = (e.target.name === "price" || e.target.name === "reminderDaysBefore") 
      ? Number(e.target.value) 
      : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };


  // 3. Handle submit
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("");
    setSuccess("");

    try{
      // Convert HTML date strings back to full ISO format for backend Prisma
      const payload = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        renewalDate: new Date(formData.renewalDate).toISOString()
      };

      // send to backend
      const response = await api.post("/subscriptions", payload);

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
          {/* Currency */}
          <div className="form-group-currency">
            <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Currency</label>
            <select name="currency" value={formData.currency} onChange={handleChange} className="form-select w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>
          {/* Start Date */}
          <div className="form-group-start-date">
            <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Start Date</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="form-input w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]" required />
          </div>
          {/* Renewal Date */}
          <div className="form-group-renewal-date">
            <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Next Renewal Date</label>
            <input type="date" name="renewalDate" value={formData.renewalDate} onChange={handleChange} className="form-input w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]" required />
          </div>
          {/* Reminder Days Before */}
          <div className="form-group-reminder-days">
            <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Reminder (Days Before)</label>
            <input type="number" min="1" max="30" name="reminderDaysBefore" value={formData.reminderDaysBefore} onChange={handleChange} className="form-input w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]" required />
          </div>
          {/* Payment Method */}
          <div className="form-group-payment-method">
            <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Payment Method</label>
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="form-select w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]">
              <option value="CREDIT_CARD">Credit Card</option>
              <option value="DEBIT_CARD">Debit Card</option>
              <option value="PAYPAL">PayPal</option>
              <option value="BANK_TRANSFER">Bank Transfer</option>
            </select>
          </div>
          {/* Payment Provider (Card Info) */}
          <div className="form-group-payment-provider sm:col-span-2">
            <label className="form-label mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Payment Provider / Card Info</label>
            <input type="text" name="paymentProvider" value={formData.paymentProvider} onChange={handleChange} placeholder="e.g., Visa ending in 4242, HDFC Bank..." className="form-input w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]" required />
          </div>
        </div>
        <Button variant="primary" type="submit" className="mt-6 w-full">
          Save Subscription
        </Button>
      </form>
    </div>
  );
}


export default AddSubscription;