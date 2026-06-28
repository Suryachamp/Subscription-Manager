const prisma = require("../config/prisma");
const {  subscriptionSchema } = require("../validations/subscription.validation");

exports.createSubscription = async (req, res) => {
  try {
    // Validate the incoming request body
    const validationResult = subscriptionSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        errors: validationResult.error.flatten().fieldErrors,
      });
    }

    // Use validated data instead of req.body because Zod has already
    // validated and transformed the input according to our schema.
    const {
      platformName,
      category,
      price,
      currency,
      billingCycle,
      startDate,
      renewalDate,
      reminderDaysBefore,
      paymentMethod,
      paymentProvider,
      status,
      subscriptionSource,
    } = validationResult.data;

    // Get the logged-in user's ID from the JWT middleware
    const userId = req.user.userId;

    // Create the subscription
    const subscription = await prisma.subscription.create({
      data: {
        platformName,
        category,
        price,
        currency,
        billingCycle,
        startDate: new Date(startDate),
        renewalDate: new Date(renewalDate),
        reminderDaysBefore,
        paymentMethod,
        paymentProvider,
        status,
        subscriptionSource,
        userId,
      },
    });

    // Return success response
    return res.status(201).json({
      message: "Subscription created successfully",
      subscription,
    });
  } catch (error) {
    console.error("Create Subscription Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
