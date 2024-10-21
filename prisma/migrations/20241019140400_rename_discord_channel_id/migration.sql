/*
  Warnings:

  - You are about to drop the column `channelId` on the `DiscordServer` table. All the data in the column will be lost.
  - Added the required column `discordChannelID` to the `DiscordServer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiscordServer" DROP COLUMN "channelId",
ADD COLUMN     "discordChannelID" TEXT NOT NULL;
