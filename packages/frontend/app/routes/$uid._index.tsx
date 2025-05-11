import Avatar from "boring-avatars";
import { useParams } from "react-router";
import Records from "~/components/Records";
import {
  type Basename,
  getBasenameTextRecord,
  getBasenameTextRecords,
} from "~/lib/basename";
import { getImageUrl } from "~/lib/utils";
import type { Route } from "./user/+types/_index";

export function meta({ params }: Route.MetaArgs) {
  const uid = params?.uid ?? "A Profile on EPO";

  return [{ title: uid }];
}

export async function loader({ params }: Route.LoaderArgs) {
  const uid = params?.uid as Basename;
  const location = await getBasenameTextRecord(uid, "location");
  const url2 = await getBasenameTextRecord(uid, "url2");
  const url3 = await getBasenameTextRecord(uid, "url3");
  const textRecords = await getBasenameTextRecords(uid);
  return {
    uid,
    records: {
      ...textRecords,
      location,
      url2,
      url3,
    },
  };
}

export default function User({ loaderData }: Route.ComponentProps) {
  const { uid } = useParams();
  console.log("----- User ---", loaderData);

  return (
    loaderData?.records && (
      <>
        <div className="container mx-auto max-w-[420px] p-6">
          {loaderData?.records?.avatar ? (
            <img
              src={getImageUrl(loaderData.records.avatar)}
              className="h-20 w-20 rounded-full border-2 border-white/20"
              alt={`${uid}'s avatar`}
            />
          ) : (
            <Avatar
              variant="beam"
              name={uid ?? ""}
              size={80}
              className="rounded-full border-2 border-white/20"
            />
          )}
        </div>
        <p>{uid}</p>
        <Records data={loaderData} />
      </>
    )
  );
}
