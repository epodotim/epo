import type { Route } from "./+types/account.setting";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Dashboard | EPO" }];
}

export default function AccountSettingPage({
  loaderData,
}: Route.ComponentProps) {
  return <p>User Account Setting</p>;
}
