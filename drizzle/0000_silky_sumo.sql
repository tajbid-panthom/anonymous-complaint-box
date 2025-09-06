CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(64),
	"password_hash" varchar(128),
	"role" varchar(32),
	CONSTRAINT "admins_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"case_id" varchar(255),
	"admin_id" integer,
	"action" varchar(100),
	"old_status" varchar(50),
	"new_status" varchar(50),
	"notes" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"case_id" varchar(255),
	"sender_type" varchar(20),
	"admin_id" integer,
	"message" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "complaints" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" varchar(64),
	"location" varchar(128),
	"description" text,
	"evidence_url" varchar(256),
	"status" varchar(32) DEFAULT 'Received',
	"case_id" varchar(16),
	"pin_hash" varchar(128),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "complaints_case_id_unique" UNIQUE("case_id")
);
