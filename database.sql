CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "images" (
	"id" SERIAL PRIMARY KEY,
	"url" VARCHAR(250) NOT NULL,
	"created" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	"show" BOOLEAN DEFAULT FALSE
);
CREATE TABLE "orders"(
	"id" SERIAL PRIMARY KEY,
	"complete" BOOLEAN DEFAULT FALSE,
	"order_date" TIMESTAMPTZ DEFAULT NOT NULL,
	"email" VARCHAR(50) NOT NULL,
	"name" VARCHAR(50) NOT NULL,
	"total" MONEY
);
CREATE TABLE "order_ids"(
	"id" SERIAL PRIMARY KEY,
	"image_id" INT REFERENCES "images" NOT NULL,
	"order_id" INT REFERENCES "orders" NOT NULL
);
CREATE TABLE "emails"(
	"id" SERIAL PRIMARY KEY,
	"date_sent" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	"email_address" VARCHAR(50) NOT NULL,
	"email_text" TEXT NOT NULL,
	"name" VARCHAR(50) NOT NULL,
	"total" MONEY,
	"order_id" INT REFERENCES "orders" NOT NULL
);

-- TODO - price and tax tables
CREATE TABLE "cost"(
	"id" SERIAL PRIMARY KEY,
	"cost" DECIMAL NO NULL
)
CREATE TABLE "tax"(
	"id" SERIAL PRIMARY KEY,
	"tax" DECIMAL NO NULL
)