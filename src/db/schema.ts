import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `invisibiz_${name}`);

export const searchStatusEnum = pgEnum("search_status", [
  "processing",
  "fulfilled",
  "failed",
]);

export const searches = createTable("search", {
  id: serial("id").primaryKey().unique(),
  status: searchStatusEnum("status").default("processing").notNull(),
  business: text("business").notNull(),
  location: text("location").notNull(),
  resultsCount: integer("results_count").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});

export const businesses = createTable("business", {
  id: serial("id").primaryKey().unique(),
  name: text("name").notNull(),
  rating: text("rating").notNull(),
  reviews: text("reviews").notNull(),
  type: text("type").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  description: text("description").notNull(),
  serviceOptions: text("service_options").notNull(),
  placeUrl: text("place_url").notNull(),
  dataId: text("data_id").notNull(),
  website: text("website"),
  searchId: text("userId")
    .notNull()
    .references(() => searches.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});

export const searchesRelations = relations(searches, ({ many }) => ({
  businesses: many(businesses),
}));

export const businessesRelations = relations(businesses, ({ one }) => ({
  user: one(searches, {
    fields: [businesses.searchId],
    references: [searches.id],
  }),
}));
