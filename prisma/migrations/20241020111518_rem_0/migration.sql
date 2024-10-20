-- AlterTable
CREATE SEQUENCE anonymoususervisit_id_seq;
ALTER TABLE "AnonymousUserVisit" ALTER COLUMN "id" SET DEFAULT nextval('anonymoususervisit_id_seq');
ALTER SEQUENCE anonymoususervisit_id_seq OWNED BY "AnonymousUserVisit"."id";
