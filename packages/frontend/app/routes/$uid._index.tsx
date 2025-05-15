import { useParams } from "react-router";
import { BaseLayout } from "~/components/Layouts";
import Profile from "~/components/Profile";
import type { Basename } from "~/lib/basename";
import type { Route } from "./+types/$uid._index";

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

  return (
    <BaseLayout>
      {loaderData?.records && (
        <div className="profile container mx-auto max-w-screen-sm">
          <Profile data={loaderData} />
          <hr />
        </div>
      )}
    </BaseLayout>
  );
}
