import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/account", "./routes/account/_index.tsx"),
  route("/:uid", "./routes/user/_index.tsx"),
] satisfies RouteConfig;
