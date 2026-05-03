-- AlterTable: add updatedAt with default for existing rows
ALTER TABLE "AdminUser" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now();
