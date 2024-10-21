/*
  Warnings:

  - You are about to drop the `AnonymousUserVisit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AnonymousUserVisit";

-- CreateTable
CREATE TABLE "AnonymousUser" (
    "id" SERIAL NOT NULL,
    "EcoleDirectePlusUserId" INTEGER NOT NULL,
    "date" INTEGER NOT NULL,

    CONSTRAINT "AnonymousUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DaylyVisits" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "DaylyVisits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnonymousUser_EcoleDirectePlusUserId_key" ON "AnonymousUser"("EcoleDirectePlusUserId");
