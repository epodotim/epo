import { APP_DESCRIPTION } from "~/lib/const";
import type { Route } from "./+types/_index";

export function meta(_: Route.MetaArgs) {
  return [{ title: APP_DESCRIPTION }];
}

export default function HomePage(_: Route.ComponentProps) {
  return <p>Home</p>;
}
