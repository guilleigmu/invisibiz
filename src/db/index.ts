import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const pg = postgres(env.DATABASE_URL);
const conn = globalForDb.conn ?? pg;
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

const db = drizzle(conn, { schema });
export { db, pg };
