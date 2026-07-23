const cron = require('node-cron');
const prisma = require('../config/prisma');

const startCronJobs = () => {
  // Run every day at midnight: "0 0 * * *"
  cron.schedule('0 0 * * *', async () => {
    console.log('⏳ Running daily subscription check...');

    try {
      // Find all subscriptions that are active
      const subscriptions = await prisma.subscription.findMany({
        where: { status: 'Active' }
      });

      const today = new Date();

      for (const sub of subscriptions) {
        // Calculate the difference in days between renewal date and today
        const diffTime = new Date(sub.renewalDate) - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // If the renewal is coming up in exactly `reminderDaysBefore` days
        if (diffDays === sub.reminderDaysBefore) {
          
          // Create a Notification in the database
          await prisma.notification.create({
            data: {
              userId: sub.userId,
              subscriptionId: sub.id,
              message: `Your ${sub.platformName} subscription of $${sub.price} renews in ${diffDays} days!`,
              type: 'RENEWAL',
            }
          });
          
          console.log(`✅ Created notification for user ${sub.userId} regarding ${sub.platformName}`);
        }
      }
    } catch (error) {
      console.error('❌ Error in cron job:', error);
    }
  });
};

module.exports = startCronJobs;
