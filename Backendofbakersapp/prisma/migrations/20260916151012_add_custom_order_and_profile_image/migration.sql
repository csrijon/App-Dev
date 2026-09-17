/*
  Warnings:

  - Made the column `status` on table `Refund` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Refund` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Refund` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Refund" DROP CONSTRAINT "Refund_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Refund" DROP CONSTRAINT "Refund_userId_fkey";

-- DropIndex
DROP INDEX "Order_userId_idx";

-- AlterTable
ALTER TABLE "Login&signupsystem" ADD COLUMN     "profileImageUrl" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "deliveryDate" TIMESTAMP(3),
ADD COLUMN     "idempotencyKey" VARCHAR(255),
ADD COLUMN     "storeProfileId" INTEGER;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "storeProfileId" INTEGER;

-- AlterTable
ALTER TABLE "Refund" ALTER COLUMN "reason" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "adminReason" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Onboarding" (
    "id" SERIAL NOT NULL,
    "bakersName" VARCHAR(150),
    "ownerName" VARCHAR(150),
    "email" VARCHAR(150),
    "phone" VARCHAR(20),
    "businessType" VARCHAR(50),
    "logoUrl" TEXT,
    "shopAddress" TEXT,
    "landmark" TEXT,
    "city" VARCHAR(50),
    "pincode" VARCHAR(10),
    "state" VARCHAR(50),
    "fssaiNumber" VARCHAR(50),
    "fssaiImage" TEXT,
    "openingTime" TEXT,
    "closingTime" TEXT,
    "weeklyOffDay" TEXT,
    "acceptOrder247" BOOLEAN NOT NULL DEFAULT false,
    "deliveryAvailable" BOOLEAN NOT NULL DEFAULT false,
    "deliveryRadius" TEXT,
    "deliveryCharge" TEXT,
    "freeDeliveryAbove" TEXT,
    "minimumOrderValue" TEXT,
    "productNames" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Onboarding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreProfile" (
    "id" SERIAL NOT NULL,
    "bakersName" VARCHAR(150),
    "ownerName" VARCHAR(150),
    "email" VARCHAR(150),
    "phone" VARCHAR(20),
    "businessType" VARCHAR(50),
    "logoUrl" TEXT,
    "shopAddress" TEXT,
    "landmark" TEXT,
    "city" VARCHAR(50),
    "pincode" VARCHAR(10),
    "state" VARCHAR(50),
    "fssaiNumber" VARCHAR(50),
    "fssaiImage" TEXT,
    "openingTime" TEXT,
    "closingTime" TEXT,
    "weeklyOffDay" TEXT,
    "acceptOrder247" BOOLEAN NOT NULL DEFAULT false,
    "deliveryAvailable" BOOLEAN NOT NULL DEFAULT false,
    "deliveryRadius" TEXT,
    "deliveryCharge" TEXT,
    "freeDeliveryAbove" TEXT,
    "minimumOrderValue" TEXT,
    "productNames" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoreProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResetToken" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomOrder" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cakeType" TEXT,
    "flavor" TEXT,
    "size" TEXT,
    "message" TEXT,
    "preferredDeliveryDate" TIMESTAMP(3),
    "description" TEXT,
    "referenceImageUrl" TEXT,
    "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetToken_email_key" ON "ResetToken"("email");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Login&signupsystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Login&signupsystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Login&signupsystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_storeProfileId_fkey" FOREIGN KEY ("storeProfileId") REFERENCES "StoreProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeProfileId_fkey" FOREIGN KEY ("storeProfileId") REFERENCES "StoreProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResetToken" ADD CONSTRAINT "ResetToken_email_fkey" FOREIGN KEY ("email") REFERENCES "Login&signupsystem"("Email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomOrder" ADD CONSTRAINT "CustomOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Login&signupsystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Login&signupsystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
