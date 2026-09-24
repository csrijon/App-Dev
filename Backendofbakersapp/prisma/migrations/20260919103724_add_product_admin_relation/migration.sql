/*
  Warnings:

  - Made the column `role` on table `Login&signupsystem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Login&signupsystem" ALTER COLUMN "role" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "VisitorLogs" (
    "id" SERIAL NOT NULL,
    "sessionId" VARCHAR(255),
    "ipAddress" VARCHAR(45),
    "pageUrl" VARCHAR(500),
    "userAgent" TEXT,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitorLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageViews" (
    "id" SERIAL NOT NULL,
    "pagePath" VARCHAR(500) NOT NULL,
    "pageTitle" VARCHAR(255),
    "source" VARCHAR(50),
    "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageViews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VisitorLogs_visitedAt_idx" ON "VisitorLogs"("visitedAt");

-- CreateIndex
CREATE INDEX "VisitorLogs_sessionId_idx" ON "VisitorLogs"("sessionId");

-- CreateIndex
CREATE INDEX "PageViews_watchedAt_idx" ON "PageViews"("watchedAt");

-- CreateIndex
CREATE INDEX "PageViews_source_idx" ON "PageViews"("source");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Login&signupsystem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
