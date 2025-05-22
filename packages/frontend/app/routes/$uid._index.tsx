import { useParams } from "react-router";
import { BaseLayout } from "~/components/Layouts";
import Profile from "~/components/Profile";
import type { Basename } from "~/lib/basename";
import type { Route } from "./+types/$uid._index";
import { Tabs } from "@base-ui-components/react/tabs";
import { useAttestations } from "~/hooks/useAttestations";
import { getBasenameTextRecord, getBasenameTextRecords } from "~/lib/basename";
import {
  LinkSimple,
  Clock,
  ChatTeardropDots,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { Link } from "react-router";
import StyledName from "~/components/StyledName";
import Avatar from "~/components/Avatar";

export function meta({ params }: Route.MetaArgs) {
  const uid = params?.uid ?? "A Profile on EPO";

  return [{ title: uid }];
}

export async function loader({ context, params }: Route.LoaderArgs) {
  const uid = params?.uid as Basename;
  // const location = await getBasenameTextRecord(uid, "location");
  // const url2 = await getBasenameTextRecord(uid, "url2");
  // const url3 = await getBasenameTextRecord(uid, "url3");
  // const textRecords = await getBasenameTextRecords(uid);

  const posts = await context.db.query.post.findMany({
    where: (post, { isNotNull, eq, and }) =>
      and(isNotNull(post.publishedAt), eq(post.author, uid)),
    with: {
      post_meta: true,
    },
    orderBy: (post, { desc }) => [desc(post.publishedAt)],
  });

  console.log("posts:::", posts);

  // return {
  //   uid,
  //   records: {
  //     ...textRecords,
  //     location,
  //     url2,
  //     url3,
  //   },
  //   posts,
  // };

  return {
    uid: "yujiym.base.eth",
    records: {
      description: "Building epo.im and kon.xyz",
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
    posts,
  };
}

export default function User({ loaderData }: Route.ComponentProps) {
  const { uid } = useParams();
  const { data: attests } = useAttestations(uid);
  const posts = loaderData?.posts;
  console.log("posts:::----", posts, "attests:::----", attests);

  return (
    <BaseLayout>
      {loaderData?.records && (
        <div className="profile container mx-auto max-w-screen-sm">
          <Profile data={loaderData} />
          <Tabs.Root className="" defaultValue="posts">
            <Tabs.List className="relative z-0 flex gap-4 border-c2 border-b-2">
              <Tabs.Tab className="py-1.5 pr-2.5 pl-3.5 text-sm" value="posts">
                Posts
                {posts && posts.length > 0 && (
                  <span className="pill">{posts.length}</span>
                )}
              </Tabs.Tab>
              <Tabs.Tab
                className="py-1.5 pr-2.5 pl-3.5 text-sm"
                value="attestations"
              >
                Attestions
                {attests && attests.length > 0 && (
                  <span className="pill">{attests.length}</span>
                )}
              </Tabs.Tab>
              <Tabs.Indicator className="-bottom-0.5 absolute z-[-1] w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] border-c1 border-b-2 transition-all duration-200 ease-in-out" />
            </Tabs.List>
            <Tabs.Panel className="relative" value="posts">
              {posts && posts.length > 0 ? (
                <ul className="flex w-full flex-col">
                  {posts.map((post) => (
                    <li
                      key={post.uid}
                      className="relative min-h-18 border-c1 border-b px-3 py-4"
                    >
                      <Link to={`/p/${post.uid}`}>
                        <h4 className="block py-3">{post.title}</h4>
                        <span className="absolute right-2 bottom-2 flex items-center gap-1 text-xs opacity-70">
                          <Clock size={18} />
                          {new Date(String(post.publishedAt)).toLocaleString()}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-12 text-center opacity-70">No posts yet</p>
              )}
            </Tabs.Panel>
            <Tabs.Panel className="relative" value="attestations">
              {attests && attests.length > 0 ? (
                <ul className="flex w-full flex-col">
                  {attests.map((item) => (
                    <li
                      key={item.id}
                      className="relative min-h-18 border-c1 border-b px-4 py-3"
                    >
                      <div className="flex items-center gap-4 py-3">
                        <div className="flex items-center">
                          <Link
                            to={`/${item.attesterName}`}
                            className="flex items-center text-sm"
                          >
                            <Avatar
                              fullname={item.attesterName}
                              className="mr-2 h-5 w-5"
                            />
                            <StyledName fullname={item.attesterName ?? ""} />
                          </Link>
                        </div>
                        <div className="opacity-70">&rarr;</div>
                        <div className="flex items-center">
                          <Link
                            to={`/${item.recipientName}`}
                            className="flex items-center text-sm"
                          >
                            <Avatar
                              fullname={item.recipientName}
                              className="mr-2 h-5 w-5"
                            />
                            <StyledName fullname={item.recipientName ?? ""} />
                          </Link>
                        </div>
                      </div>
                      <div className="flex flex-col items-start">
                        {item?.url && (
                          <Link
                            to={item.url}
                            className="mt-2 flex items-center gap-1 px-0.5 text-xs"
                          >
                            <LinkSimple size={18} />
                            <span>{item.url}</span>
                          </Link>
                        )}
                        {item?.message && (
                          <div className="mt-2 flex items-start gap-1 rounded-lg bg-c1 py-1.5 pr-6 pl-4 text-xs">
                            <ChatTeardropDots size={18} />
                            <p>{item.message}</p>
                          </div>
                        )}
                      </div>
                      <a
                        className="absolute top-2 right-2 flex items-center"
                        href={`https://base-sepolia.easscan.org/attestation/view/${item.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ArrowUpRight size={22} />
                      </a>
                      <span className="absolute right-2 bottom-2 flex items-center gap-1 text-xs opacity-70">
                        <Clock size={18} />
                        {new Date(item.timeCreated * 1_000).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-12 text-center opacity-70">
                  No attestations yet
                </p>
              )}
            </Tabs.Panel>
          </Tabs.Root>
        </div>
      )}
    </BaseLayout>
  );
}
