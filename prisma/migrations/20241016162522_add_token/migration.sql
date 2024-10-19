/*
  Warnings:

  - A unique constraint covering the columns `[activeToken]` on the table `APIUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "APIUser" ADD COLUMN     "activeToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "APIUser_activeToken_key" ON "APIUser"("activeToken");
