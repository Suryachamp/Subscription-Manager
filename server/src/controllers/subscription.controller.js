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


exports.getSubscription = async (req,res) => {
  try{
    //why because this will give me only the subcriptions that belong to this user
    const userId = req.user.userId;

    //This is to get exacctly what subscriptions does that x user hold from the db
    const subscriptions = await prisma.subscription.findMany({
      where:{
        userId: userId,
      }
    })

    return res.status(200).json({
      message: "Subscription fetched successfully",
      subscriptions
    })

  } catch (error){
    console.log("Get subscription Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    })
  }
};


exports.getSubscriptionbyId = async (req,res) => {
  try{
    //this will convert the id to number because the one that is coming in json is in string
    const id = Number(req.params.id); //value extracted from the URL (like :id)
    const userId = req.user.userId; //

    const subscription = await prisma.subscription.findFirst({
      where:{
        id,
        userId
      }
    })

    if(!subscription){
      return res.status(404).json({
        message:"Subscription not found",
      });
    }

    return res.status(200).json({
      message:"Subscription fetched successfully",
      subscription,
    })
  } catch (error) {
    console.log("Get subscription by id error:", error);

    return res.status(500).json({
      message: "Internal server error",
    })
  }
};
