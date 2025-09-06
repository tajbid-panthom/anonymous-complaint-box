import { pgTable, serial, varchar, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const complaints = pgTable('complaints', {
  id: serial('id').primaryKey(),
  category: varchar('category', { length: 64 }),
  location: varchar('location', { length: 128 }),
  description: text('description'),
  evidence_url: varchar('evidence_url', { length: 256 }),
  status: varchar('status', { length: 32 }).default('Received'),
  case_id: varchar('case_id', { length: 16 }).unique(),
  pin_hash: varchar('pin_hash', { length: 128 }),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 64 }).unique(),
  password_hash: varchar('password_hash', { length: 128 }),
  role: varchar('role', { length: 32 }),
});

export const audit_logs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  case_id: varchar('case_id', { length: 255 }),
  admin_id: integer('admin_id'),
  action: varchar('action', { length: 100 }),
  old_status: varchar('old_status', { length: 50 }),
  new_status: varchar('new_status', { length: 50 }),
  notes: text('notes'),
  created_at: timestamp('created_at').defaultNow(),
});

export const chat_messages = pgTable('chat_messages', {
  id: serial('id').primaryKey(),
  case_id: varchar('case_id', { length: 255 }),
  sender_type: varchar('sender_type', { length: 20 }), // 'user' or 'admin'
  admin_id: integer('admin_id'),
  message: text('message'),
  created_at: timestamp('created_at').defaultNow(),
});
