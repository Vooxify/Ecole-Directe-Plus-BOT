/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `APIUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "APIUser_username_key" ON "APIUser"("username");
