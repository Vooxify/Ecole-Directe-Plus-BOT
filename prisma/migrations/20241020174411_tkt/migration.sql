/*
  Warnings:

  - Changed the type of `createdAt` on the `DaylyVisits` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DaylyVisits" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" INTEGER NOT NULL;
