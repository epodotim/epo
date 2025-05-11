import type { Route } from "./+types/dashboard._index";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Dashboard | EPO" }];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <p>User Account Home</p>;
}
