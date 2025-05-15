import { type DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import { createRequestHandler } from "react-router";
import * as schema from "db/schema";
import { getApp } from "server";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
    db: DrizzleD1Database<typeof schema>;
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

// -- use hono
const app = getApp(async (request, env, ctx) => {
  return requestHandler(request, {
    cloudflare: { env, ctx },
    db: drizzle(env.DB, { schema }),
  });
});

export default app satisfies ExportedHandler<Env>;

// -- default
// export default {
//   async fetch(request, env, ctx) {
//     const db = drizzle(env.DB, { schema });
//     return requestHandler(request, {
//       cloudflare: { env, ctx },
//       db,
//     });
//   },
// } satisfies ExportedHandler<Env>;
