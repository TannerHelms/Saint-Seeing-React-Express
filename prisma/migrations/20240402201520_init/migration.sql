/*
  Warnings:

  - Added the required column `profile1Id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile2Id` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_receiverId_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "profile1Id" INTEGER NOT NULL,
ADD COLUMN     "profile2Id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_profile1Id_profile2Id_fkey" FOREIGN KEY ("profile1Id", "profile2Id") REFERENCES "Conversation"("profile1Id", "profile2Id") ON DELETE RESTRICT ON UPDATE CASCADE;
