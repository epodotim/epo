import { useParams } from "react-router";
import { BaseLayout } from "~/components/Layouts";
import Profile from "~/components/Profile";
import type { Basename } from "~/lib/basename";
import type { Route } from "./+types/$uid._index";
import { Tabs } from "@base-ui-components/react/tabs";
import useAttestations from "~/hooks/useAttestations";

export function meta({ params }: Route.MetaArgs) {
  const uid = params?.uid ?? "A Profile on EPO";

  return [{ title: uid }];
}

export async function loader({ params }: Route.LoaderArgs) {
  const uid = params?.uid as Basename;
  // const location = await getBasenameTextRecord(uid, "location");
  // const url2 = await getBasenameTextRecord(uid, "url2");
  // const url3 = await getBasenameTextRecord(uid, "url3");
  // const textRecords = await getBasenameTextRecords(uid);
  // return {
  //   uid,
  //   records: {
  //     ...textRecords,
  //     location,
  //     url2,
  //     url3,
  //   },
  // };

  return {
    uid: "yujiym.base.eth",
    records: {
      description: "A builder",
      keywords:
        "Solidity,Javascript,Typescript,UI/UX,Go,Prototyping,Product management",
      url: "https://oboro.xyz",
      url2: "https://kon.xyz",
      "com.github": "yujiym",
      "com.twitter": "yujiym",
      "xyz.farcaster": "yujiym",
      "org.telegram": "yujiym",
      avatar:
        "ipfs://bafybeicmbmchjfn4ahlyxnqswdaeim4ornfkdf4ahlcc4txpr6y4r33rri",
      location: "Japan",
      url3: "",
    },
  };
}

export default function User({ loaderData }: Route.ComponentProps) {
  const { uid } = useParams();
  console.log("----- User ---", loaderData);
  const { data } = useAttestations();

  return (
    <BaseLayout>
      {loaderData?.records && (
        <div className="profile container mx-auto max-w-screen-sm">
          <Profile data={loaderData} />
          <Tabs.Root className="" defaultValue="posts">
            <Tabs.List className="relative z-0 flex gap-4 border-c2 border-b-2">
              <Tabs.Tab className="px-2.5 py-1.5 text-sm" value="posts">
                Posts
                <span className="pill">3</span>
              </Tabs.Tab>
              <Tabs.Tab className="px-2.5 py-1.5 text-sm" value="attestations">
                Attestions<span className="pill">0</span>
              </Tabs.Tab>
              <Tabs.Tab className="px-2.5 py-1.5 text-sm" value="recieved">
                Recieved<span className="pill">1</span>
              </Tabs.Tab>
              <Tabs.Indicator className="-bottom-0.5 absolute z-[-1] w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] border-c1 border-b-2 transition-all duration-200 ease-in-out" />
            </Tabs.List>
            <Tabs.Panel
              className="relative flex h-32 items-center justify-center"
              value="posts"
            >
              <p className="opacity-70">No posts yet</p>
            </Tabs.Panel>
            <Tabs.Panel
              className="relative flex h-32 items-center justify-center"
              value="attestations"
            >
              <p className="opacity-70">No attestations yet</p>
            </Tabs.Panel>
            <Tabs.Panel
              className="relative flex h-32 items-center justify-center"
              value="recieved"
            >
              <p className="opacity-70">No recieved attestations yet</p>
            </Tabs.Panel>
          </Tabs.Root>
        </div>
      )}
    </BaseLayout>
  );
}
