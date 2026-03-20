CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ownerId" uuid NOT NULL,
	"latitude" numeric(9, 6) NOT NULL,
	"longitude" numeric(9, 6) NOT NULL,
	"name" text NOT NULL,
	"ticket_price_in_cents" integer NOT NULL,
	"date" timestamp with time zone NOT NULL
);
