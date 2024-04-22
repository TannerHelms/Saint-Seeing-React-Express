-- CreateTable
CREATE TABLE "CompressJob" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompressJob_pkey" PRIMARY KEY ("id")
);
