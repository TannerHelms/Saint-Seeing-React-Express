/*
  Warnings:

  - You are about to drop the `ConversationRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConversationRequest" DROP CONSTRAINT "ConversationRequest_fromId_fkey";

-- DropForeignKey
ALTER TABLE "ConversationRequest" DROP CONSTRAINT "ConversationRequest_toId_fkey";

-- DropTable
DROP TABLE "ConversationRequest";

-- CreateTable
CREATE TABLE "Request" (
    "id" INTEGER NOT NULL,
    "fromId" INTEGER NOT NULL,
    "toId" INTEGER NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("fromId","toId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Request_id_key" ON "Request"("id");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_toId_fkey" FOREIGN KEY ("toId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
