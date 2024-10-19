-- CreateTable
CREATE TABLE "DiscordServer" (
    "id" SERIAL NOT NULL,
    "ChannelId" TEXT NOT NULL,

    CONSTRAINT "DiscordServer_pkey" PRIMARY KEY ("id")
);
