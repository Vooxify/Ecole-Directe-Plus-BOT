-- CreateTable
CREATE TABLE "DiscordServer" (
    "id" SERIAL NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "DiscordServer_pkey" PRIMARY KEY ("id")
);
