-- CreateTable
CREATE TABLE "Counter" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("id")
);
