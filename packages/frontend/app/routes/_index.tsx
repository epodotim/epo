import { APP_DESCRIPTION } from "~/lib/const";
import type { Route } from "./+types/_index";
import { BaseLayout } from "~/components/Layouts";
import Logo from "~/components/icons/EPO";

export function meta(_: Route.MetaArgs) {
  return [{ title: APP_DESCRIPTION }];
}

export default function HomePage(_: Route.ComponentProps) {
  return (
    <BaseLayout
      renderHeader={
        <h1 className="flex h-14 items-center justify-center font-dot text-2xl">
          <Logo className="mr-1.5 h-8 w-8" />
          EPO
        </h1>
      }
    >
      <div>
        <h2 className="py-12 text-center font-bold font-serif text-4xl">
          More than names
        </h2>
      </div>
      <div className="container mx-auto grid max-w-screen-md grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-center font-serif text-xl">On-chain Attest</h3>
          <p>On-chain Attest Framework</p>
          <p>Skills, aaaa, aaaaa</p>
        </div>
        <div>
          <h3 className="text-center font-serif text-xl">
            Post content, Sell with x402
          </h3>
          <p>Sell content easily with `x402`</p>
          <p>Skills, aaaa, aaaaa</p>
        </div>
        <div>
          <h3 className="text-center font-serif text-xl">Get Eary Access?</h3>
          <p>Please access this page and join wailtlist.</p>
        </div>
      </div>
    </BaseLayout>
  );
}
