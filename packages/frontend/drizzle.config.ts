import type { Config } from "drizzle-kit";

export default {
  out: "./db/drizzle",
  schema: "./db/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  // dbCredentials: {
  //   databaseId: "ab763020-9dd0-49d1-9c49-d8a11e6046aa",
  //   accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
  //   token: process.env.CLOUDFLARE_TOKEN!,
  // },
} satisfies Config;
