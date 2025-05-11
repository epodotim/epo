import { APP_DESCRIPTION } from "~/lib/const";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [{ title: APP_DESCRIPTION }];
}

export function loader({ context }: Route.LoaderArgs) {
  return {};
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <p>Home</p>;
}
