/*
  Warnings:

  - You are about to drop the column `profileImageUrl` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "profileImageUrl",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "backgroundImage" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "host" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "rules" TEXT[];
