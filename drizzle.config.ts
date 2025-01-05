import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["invisibiz_*"],
  verbose: true,
  strict: true,
} satisfies Config;
