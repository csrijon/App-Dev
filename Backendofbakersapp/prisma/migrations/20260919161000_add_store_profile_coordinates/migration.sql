-- Retroactive migration for StoreProfile coordinates.
-- These columns already exist in the database.

ALTER TABLE "StoreProfile"
ADD COLUMN "latitude" DOUBLE PRECISION,
ADD COLUMN "longitude" DOUBLE PRECISION;
