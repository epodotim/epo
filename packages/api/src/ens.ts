import { Hono } from "hono";
import { cache } from "hono/cache";
import { cors } from "hono/cors";
import { type Chain, getClient } from "./lib/client";

const ens = new Hono<{ Bindings: Env }>();

ens.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "OPTIONS"],
    maxAge: 86400,
  }),
);

ens.use("*", async (c, next) => {
  const noCache = c.req.header("x-no-cache");

  if (noCache) {
    return next();
  }

  return cache({
    cacheName: "epoim-api-ens",
    cacheControl: "max-age=600",
  })(c, next);
});

ens.get("/:chain/:id", async (c) => {
  const id = c.req.param("id");
  const chain = c.req.param("chain") as Chain;
  const client = getClient(chain, c.env.ALCHEMY_API_KEY);
});

export default ens;
