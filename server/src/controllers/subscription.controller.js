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


exports.updateSubscription = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.userId;

    // 1. Find the subscription and verify it belongs to the user
    const existingSub = await prisma.subscription.findUnique({
      where: { id }
    });

    if (!existingSub) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    if (existingSub.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized to update this subscription" });
    }

    // 2. Update with whatever fields were sent in the request body
    const updatedSub = await prisma.subscription.update({
      where: { id },
      data: {
        platformName: req.body.platformName || existingSub.platformName,
        category: req.body.category || existingSub.category,
        price: req.body.price !== undefined ? req.body.price : existingSub.price,
        currency: req.body.currency || existingSub.currency,
        billingCycle: req.body.billingCycle || existingSub.billingCycle,
        startDate: req.body.startDate ? new Date(req.body.startDate) : existingSub.startDate,
        renewalDate: req.body.renewalDate ? new Date(req.body.renewalDate) : existingSub.renewalDate,
        reminderDaysBefore: req.body.reminderDaysBefore !== undefined ? req.body.reminderDaysBefore : existingSub.reminderDaysBefore,
        paymentMethod: req.body.paymentMethod || existingSub.paymentMethod,
        paymentProvider: req.body.paymentProvider || existingSub.paymentProvider,
        status: req.body.status || existingSub.status,
        autopay: req.body.autopay !== undefined ? req.body.autopay : existingSub.autopay,
      }
    });

    // 3. Invalidate cache
    await redisClient.del(`subscriptions:${userId}`);

    return res.status(200).json({
      message: "Subscription updated successfully",
      subscription: updatedSub
    });
  } catch (error) {
    console.error("Update Subscription Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.toggleAutopay = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.userId;

    const existingSub = await prisma.subscription.findUnique({
      where: { id }
    });

    if (!existingSub) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    if (existingSub.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Flip the autopay value (true → false, false → true)
    const updatedSub = await prisma.subscription.update({
      where: { id },
      data: { autopay: !existingSub.autopay }
    });

    await redisClient.del(`subscriptions:${userId}`);

    return res.status(200).json({
      message: `Autopay ${updatedSub.autopay ? 'enabled' : 'disabled'} for ${updatedSub.platformName}`,
      subscription: updatedSub
    });
  } catch (error) {
    console.error("Toggle Autopay Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
