import type { Route } from "./+types/account._index";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Dashboard | EPO" }];
}

export default function AccountPage({ loaderData }: Route.ComponentProps) {
  return <p>User Account Home</p>;
}
