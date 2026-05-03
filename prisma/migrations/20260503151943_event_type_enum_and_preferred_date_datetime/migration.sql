-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('swap', 'drive', 'meeting');

-- Convert Event.type from String to EventType enum (safe cast for existing data)
ALTER TABLE "Event" ALTER COLUMN "type" TYPE "EventType" USING "type"::"EventType";

-- Convert ContactRequest.preferredDate from String to DateTime
-- Existing values are ISO date strings like '2025-04-15' which Postgres can cast
ALTER TABLE "ContactRequest" ALTER COLUMN "preferredDate" TYPE TIMESTAMP(3) USING "preferredDate"::TIMESTAMP(3);

-- Drop default on AdminUser.updatedAt (managed by Prisma @updatedAt)
ALTER TABLE "AdminUser" ALTER COLUMN "updatedAt" DROP DEFAULT;
