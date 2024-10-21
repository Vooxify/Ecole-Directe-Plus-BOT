/*
  Warnings:

  - Added the required column `date` to the `AnonymousUserVisit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnonymousUserVisit" ADD COLUMN     "date" INTEGER NOT NULL;
