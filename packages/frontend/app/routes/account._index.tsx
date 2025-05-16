import type { Route } from "./+types/account._index";
import { AccountLayout } from "~/components/Layouts";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Dashboard | EPO" }];
}

export default function AccountPage({ loaderData }: Route.ComponentProps) {
  return (
    <AccountLayout>
      <p>User Account Home</p>
    </AccountLayout>
  );
}
