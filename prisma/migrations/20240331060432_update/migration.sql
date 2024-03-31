/*
  Warnings:

  - You are about to drop the column `id` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Request` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- DropIndex
DROP INDEX "Conversation_id_key";

-- DropIndex
DROP INDEX "Request_id_key";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "id";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "id";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_receiverId_fkey" FOREIGN KEY ("senderId", "receiverId") REFERENCES "Conversation"("profile1Id", "profile2Id") ON DELETE RESTRICT ON UPDATE CASCADE;
