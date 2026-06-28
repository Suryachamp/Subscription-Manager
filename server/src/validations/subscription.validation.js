const {z} = require("zod")

const registerSchema = z.object({
    name:z
        .string()
        .min(3, "Name must be at least 3 characteres")
        .trim(),
    
    email:z
        .string()
        .email("Please provide a valid email")
        .toLowerCase(),

    password:z
        .string()
        .min(8,"Password must be of atleast 9 characters"),
});

const loginSchema = z.object({
    email:z
        .string()
        .email("Please provide a valid email")
        .toLowerCase(),
    
    password:z
        .string()
        .min(8,"Password must be of atleast 9 characters"),
});


const subscriptionSchema = z.object({
  platformName: z
    .string()
    .min(2, "Platform name must be at least 2 characters")
    .trim(),

  category: z
    .string()
    .min(2, "Category is required")
    .trim(),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  currency: z
    .string()
    .min(3, "Currency is required")
    .max(3, "Currency must be a 3-letter code")
    .toUpperCase(),

  billingCycle: z.enum(
    ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"],
    {
      errorMap: () => ({
        message: "Billing cycle must be DAILY, WEEKLY, MONTHLY or YEARLY",
      }),
    }
  ),

  startDate: z
    .string()
    .datetime("Invalid start date"),

  renewalDate: z
    .string()
    .datetime("Invalid renewal date"),

  reminderDaysBefore: z
    .number()
    .int("Reminder days must be an integer")
    .min(0, "Reminder days cannot be negative"),

  paymentMethod: z.enum(
    ["UPI", "CREDIT_CARD", "DEBIT_CARD", "NET_BANKING", "WALLET"],
    {
      errorMap: () => ({
        message: "Invalid payment method",
      }),
    }
  ),

  paymentProvider: z
    .string()
    .min(2, "Payment provider is required")
    .trim(),

  status: z.enum(
    ["ACTIVE", "CANCELLED", "EXPIRED"],
    {
      errorMap: () => ({
        message: "Invalid subscription status",
      }),
    }
  ),

  subscriptionSource: z.enum(
    ["MANUAL", "PLAID"],
    {
      errorMap: () => ({
        message: "Subscription source must be MANUAL or PLAID",
      }),
    }
  ),
});

module.exports = {
    registerSchema,
    loginSchema,
    subscriptionSchema
};