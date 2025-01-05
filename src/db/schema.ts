import { sql } from "drizzle-orm";
import { pgTableCreator, serial, text, timestamp } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `invisibiz_${name}`);

export const businesses = createTable("business", {
  id: serial("id").primaryKey().unique(),
  name: text("name").notNull(),
  rating: text("rating").notNull(),
  reviews: text("reviews").notNull(),
  type: text("type").notNull(),
  address: text("address").notNull(),
  website: text("website").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});
