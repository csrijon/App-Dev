CREATE TABLE "Refund" (
  "id" SERIAL PRIMARY KEY,
  "orderId" INTEGER NOT NULL,
  "userId" INTEGER NOT NULL,
  "reason" VARCHAR(255),
  "status" VARCHAR(20) DEFAULT 'pending',
  "adminReason" VARCHAR(255),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE CASCADE,
  FOREIGN KEY ("userId") REFERENCES "Login&signupsystem"("id") ON DELETE CASCADE
);
CREATE INDEX "Refund_orderId_idx" ON "Refund"("orderId");
CREATE INDEX "Refund_userId_idx" ON "Refund"("userId");
CREATE INDEX "Refund_status_idx" ON "Refund"("status");
