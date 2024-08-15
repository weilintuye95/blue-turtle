// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTableCreator,
  uuid,
  timestamp,
  text
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

export const users = createTable('users', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  username: text('username').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdateFn(() => sql`CURRENT_TIMESTAMP`)
});

export const chats = createTable(
  "chats",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    userId: uuid("user_id").notNull().references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdateFn(() => sql`CURRENT_TIMESTAMP`)
  },
  (table) => ({
    userIdIndex: index("user_id_idx").on(table.userId)
  })
);

export const messageSenderEnum = pgEnum('message_sender', ['user', 'ai']);

export const messages = createTable(
  "messages",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    chatId: uuid("chat_id")
      .notNull()
      .references(() => chats.id, { onDelete: "cascade", onUpdate: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    sender: messageSenderEnum('sender').notNull(),
    body: text("body").notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
  },
  (table) => ({
    chatIdIndex: index("chat_id_idx").on(table.chatId)
  })
);