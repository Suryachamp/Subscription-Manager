const prisma = require("../config/prisma");
const redisClient = require("../config/redis");
const { subscriptionSchema } = require("../validations/subscription.validation");

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
    // INVALIDATE CACHE: Delete the user's cached data so their dashboard fetches fresh data next time
    await redisClient.del(`subscriptions:${userId}`);

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
    const userId = req.user.userId;
    const cacheKey = `subscriptions:${userId}`;

    // 1. Check Redis Cache First
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      // Cache HIT! Parse the JSON string back into a JS object and return immediately.
      return res.status(200).json({
        message: "Subscription fetched from Cache successfully",
        subscriptions: JSON.parse(cachedData)
      });
    }

    // 2. Cache MISS: It wasn't in Redis. Fetch exactly what subscriptions that x user hold from the db
    const subscriptions = await prisma.subscription.findMany({
      where:{
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // 3. Save the result into Redis for next time. Give it an expiry of 5 minutes (300 seconds)
    await redisClient.setEx(cacheKey, 300, JSON.stringify(subscriptions));

    return res.status(200).json({
      message: "Subscription fetched from Database successfully",
      subscriptions
    });

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


exports.deleteSubscription = async (req,res) => {
  try{
    const {id} = req.params;

    // First verify that whether the subscription exists and belongs to the logged in user
    const existingSub = await prisma.subscription.findUnique({
      where : {id:parseInt(id)}
    });


    if(!existingSub){
      return res.status(400).json({
        message:"Subscription not found"
      });
    }

    if(existingSub.userId !== req.user.userId){
      return res.status(403).json({
        message:"Unauthorized to delete this subscription"
      });
    }

    // If it exists and they own it then delete it
    await prisma.subscription.delete({
      where:{id:parseInt(id)}
    });

    // INVALIDATE CACHE: Delete the user's cached data so their dashboard doesn't show the deleted item
    await redisClient.del(`subscriptions:${req.user.userId}`);

    return res.status(200).json({
      message:"subscription deleted successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:"Internal server error"
    });
  }

}
