-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'OWNER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'OWNER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "business" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueueDesk" (
    "id" SERIAL NOT NULL,
    "desk_name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "unique_url" TEXT NOT NULL,

    CONSTRAINT "QueueDesk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueueList" (
    "id" SERIAL NOT NULL,
    "queue_code" INTEGER NOT NULL,
    "order_number" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "deskId" INTEGER NOT NULL,
    "enrollAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkinAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QueueList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "QueueDesk_unique_url_key" ON "QueueDesk"("unique_url");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueDesk" ADD CONSTRAINT "QueueDesk_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueList" ADD CONSTRAINT "QueueList_deskId_fkey" FOREIGN KEY ("deskId") REFERENCES "QueueDesk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
