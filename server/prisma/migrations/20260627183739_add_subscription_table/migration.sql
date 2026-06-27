-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "platformName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "billingCycle" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "renewalDate" TIMESTAMP(3) NOT NULL,
    "reminderDaysBefore" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paymentProvider" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "subscriptionSource" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);
