-- Fix Review: add user relation foreign key (already has column, needs FK constraint)
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Login&signupsystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Fix DeliveryTracking: add unique constraint on orderId
ALTER TABLE "DeliveryTracking" ADD CONSTRAINT "DeliveryTracking_orderId_key" UNIQUE ("orderId");

-- Fix Order: add userId column (nullable since historical orders may not have it)
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "userId" INTEGER;
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Login&signupsystem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Create index for Order userId
CREATE INDEX IF NOT EXISTS "Order_userId_idx" ON "Order"("userId");
npm ryn an