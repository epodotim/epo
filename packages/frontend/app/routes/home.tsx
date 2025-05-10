import { APP_DESCRIPTION } from "~/lib/const";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [{ title: APP_DESCRIPTION }];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <p>Home</p>;
}
