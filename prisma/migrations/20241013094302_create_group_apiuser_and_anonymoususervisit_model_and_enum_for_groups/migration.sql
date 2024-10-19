-- CreateEnum
CREATE TYPE "Group" AS ENUM ('USER', 'AUTHUSER', 'NOTAUTHUSER');

-- CreateTable
CREATE TABLE "APIUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "discordTag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "group" "Group" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "APIUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnonymousUserVisit" (
    "id" SERIAL NOT NULL,
    "EcoleDirectePlusUserId" INTEGER NOT NULL,

    CONSTRAINT "AnonymousUserVisit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "APIUser_discordTag_key" ON "APIUser"("discordTag");

-- CreateIndex
CREATE UNIQUE INDEX "APIUser_email_key" ON "APIUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AnonymousUserVisit_EcoleDirectePlusUserId_key" ON "AnonymousUserVisit"("EcoleDirectePlusUserId");
