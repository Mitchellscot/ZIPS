--create the tables
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
	"order_date" TIMESTAMPTZ DEFAULT NOW(),
	"email" VARCHAR(50) NOT NULL,
	"name" VARCHAR(50) NOT NULL,
	"total" MONEY
);
CREATE TABLE "order_ids"(
	"id" SERIAL PRIMARY KEY,
	"image_id" INT REFERENCES "images" ON DELETE CASCADE NOT NULL,
	"order_id" INT REFERENCES "orders" ON DELETE CASCADE NOT NULL
);
CREATE TABLE "emails"(
	"id" SERIAL PRIMARY KEY,
	"date_sent" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	"email_address" VARCHAR(50) NOT NULL,
	"email_text" TEXT NOT NULL,
	"name" VARCHAR(50) NOT NULL,
	"total" MONEY,
	"order_id" INT REFERENCES "orders" ON DELETE CASCADE NOT NULL
);
CREATE TABLE "email_settings"(
	"id" SERIAL PRIMARY KEY,
	"source_email" VARCHAR(100) NOT NULL,
	"reply_to_email" VARCHAR(100) NOT NULL,
	"subject" VARCHAR(100) NOT NULL,
	"header" VARCHAR(1000) NOT NULL,
	"body" TEXT NOT NULL,
	"business_name" VARCHAR(250) NOT NULL,
	"business_email" VARCHAR(100) NOT NULL,
	"business_website" VARCHAR(250) NOT NULL,
	"business_phone" VARCHAR(50) NOT NULL
);
CREATE TABLE "costs"(
	"id" SERIAL PRIMARY KEY,
	"cost" MONEY NOT NULL,
	"tax" DECIMAL NOT NULL
)

--Select Statements
SELECT * FROM "images";
SELECT * FROM "orders";
SELECT * FROM "order_ids";
SELECT * FROM "emails";
SELECT * FROM "user";
SELECT * FROM "costs";
SELECT * FROM "email_settings";

--dummy data
INSERT INTO "orders" ("name", "email", "total", "order_date") VALUES
('Jonathan Edwards', 'johnedw@yale.com', 15, '2021-03-01 13:55:18.4216589-06'), --
('Richard Baxter', 'rbaxter@kidderminster.com', 25, '2021-03-02 11:35:18.4216589-06'), --
('Charles Spurgeon', 'chspurgeon@beardsncigars.com', 10, '2021-03-02 12:25:18.4216589-06'),--
('Isaac Watts', 'Iwatts@joytotheworld.com', 30, '2021-03-02 14:44:18.4216589-06'),--
('William Wilberforce', 'wwforce@abolitionist.com', 25, '2021-03-03 09:47:18.4216589-06'),--
('John Owens', 'jowens@oxford.com', 25, '2021-03-03 10:35:18.4216589-06'),--
('John Newton', 'jnewtz@wretched.com', 5, '2021-03-03 09:21:18.4216589-06'),--
('John Bunyon', 'pilgrim@progress.com', 15, '2021-03-04 11:56:18.4216589-06'),--
('Matthew Henry', 'matthenry@commentaries.com', 35, '2021-03-04 10:36:18.4216589-06'),--
('Henry Thomas', 'airplaneguy@legos.com', 10, '2021-03-04 14:45:18.4216589-06'),--
('Edward Mitchell', 'alwaysmoving@seeds.com', 5, '2021-03-04 14:05:18.4216589-06'),--
('Lydia Lynn', 'elsa@ballerina.com', 30, '2021-03-01 13:06:18.4216589-06'),--
('Arthur Norman', 'zeezee@dish.com', 25, '2021-03-01 15:26:18.4216589-06'),--
('Sarah Leighann', 'sarahlscott@me.com', 10, '2021-03-02 16:16:18.4216589-06')--
INSERT INTO "order_ids" ("order_id", "image_id") VALUES
(1, 11), (1, 13), (1, 11), 
(2, 2), (2, 4), (2, 5), (2, 11), (2, 12), 
(3, 18), (3, 19),
(4, 2), (4, 3), (4, 9), (4, 18), (4, 16), (4, 14), 
(5, 17), (5, 12), (5, 14), (5, 4), (5, 5), 
(6, 16), (6, 6), (6, 4), (6, 8), (6, 14), 
(7, 13),
(8, 12), (8, 1), (8, 2), 
(9, 1), (9, 4), (9, 6), (9, 8), (9, 9), (9, 18), (9, 14),
(10, 6), (10, 3), 
(11, 8), 
(12, 7), (12, 14), (12, 2), (12, 17), (12, 1), (12, 19), 
(13, 2), (13, 4), (13, 6), (13, 8), (13, 15), 
(14, 4), (14, 14)
INSERT INTO "images" ("url", "created") VALUES
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/BlackCouple.jpg', '2021-03-01 13:55:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/ManTrees.jpg', '2021-03-02 11:35:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/CloudyWomanZip.jpg', '2021-03-02 12:25:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/CloudyZip.jpg', '2021-03-02 14:44:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/FallCouple.jpg', '2021-03-03 09:47:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/FallZip2.jpg', '2021-03-03 10:35:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/FallZipper.jpg', '2021-03-03 09:21:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/GroupKids.jpg', '2021-03-04 11:56:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/GroupOf4.jpg', '2021-03-04 10:36:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/GroupOf5.jpg', '2021-03-04 14:45:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/KidZip.jpg', '2021-03-04 14:05:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/LilBoyZip.jpg', '2021-03-01 13:06:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/LilGirlZip.jpg', '2021-03-01 15:26:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/ManCloseUp.jpg', '2021-03-02 16:16:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/ManTrees.jpg', '2021-03-03 10:06:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/ManZip.jpg', '2021-03-04 09:23:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/SnowyZip.jpg', '2021-03-04 14:48:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/WOmanZip.jpg', '2021-03-03 13:59:18.4216589-06'),
('https://rpi-photos-solo.s3.us-east-2.amazonaws.com/YoungWomanZip.jpg', '2021-03-01 14:19:18.4216589-06')

INSERT INTO "email_settings" ("source_email", "reply_to_email", "subject", "header", "body", "business_name", "business_email", "business_website", "business_phone") 
VALUES 
('bztinfo@ziplinemn.com', 'mscott@ziplinemn.com', 'Thank you for zipping with us!', 'Thank you for your order!', 
 'To download the photos, click on the link and then right click and select "Save Image As". If you have any trouble downloading the pictures, please let us know by replying to this email address or by contacting as at the number below.</p><p>Thank you so much for choosing us for your outdoor adventure!',
 'Brainerd Zip Line Tour', 'bztiinfo@ziplinemn.com', 'www.zipbrainerd.com', '(218) 656-1111');