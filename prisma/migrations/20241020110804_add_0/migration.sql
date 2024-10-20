-- AlterTable
ALTER TABLE "AnonymousUserVisit" ALTER COLUMN "id" SET DEFAULT 0,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "AnonymousUserVisit_id_seq";
