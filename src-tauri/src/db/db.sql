CREATE TABLE IF NOT EXISTS "Users" (
  "id_user" TEXT NOT NULL UNIQUE,
	"username" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  PRIMARY KEY ("id_user")
);

CREATE TABLE IF NOT EXISTS "Passwords" (
  "id_password" TEXT NOT NULL UNIQUE,
  "id_user" TEXT NOT NULL,
  "account" TEXT NOT NULL,
  "username" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  PRIMARY KEY ("id_password"),
  FOREIGN KEY ("id_user") REFERENCES "Users" ("id_user") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Notes" (
  "id_note" TEXT NOT NULL UNIQUE,
  "id_user" TEXT NOT NULL,
  "date" INTEGER NOT NULL,
  "title" TEXT,
  "content" TEXT,
  PRIMARY KEY ("id_note"),
  FOREIGN KEY ("id_user") REFERENCES "Users" ("id_user") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Contacts" (
  "id_contact" TEXT NOT NULL UNIQUE,
  "id_user" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  PRIMARY KEY ("id_contact"),
  FOREIGN KEY ("id_user") REFERENCES "Users" ("id_user") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Phones" (
  "id_phone" INTEGER NOT NULL,
  "phone" TEXT NOT NULL,
  "id_contact" TEXT NOT NULL,
  PRIMARY KEY ("id_phone" AUTOINCREMENT),
  FOREIGN KEY ("id_contact") REFERENCES "Contacts" ("id_contact") ON DELETE CASCADE
);