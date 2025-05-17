import { BaseLayout } from "~/components/Layouts";
import type { Route } from "./+types/p.$postUid";
import x402Logo from "~/assets/x402-button-small.png";
import StyledName from "~/components/StyledName";
import {
  Clock,
  UserList,
  ArrowUpRight,
  ChatTeardropDots,
} from "@phosphor-icons/react";
import { Link } from "react-router";
import { useAttestations } from "~/hooks/useAttestations";
import { MarkdownPreview } from "~/components/MarkdownPreview";

export async function loader({ context, params }: Route.LoaderArgs) {
  const postUid = params?.postUid;

  const post = await context.db.query.post.findFirst({
    where: (post, { eq }) => eq(post.uid, postUid),
    with: {
      post_meta: true,
    },
  });

  return {
    post,
  };
}

export function meta({ data }: Route.MetaArgs) {
  const title = `${data?.post?.title ?? "A Post on EPO"}${
    data?.post?.author && ` | ${data?.post?.author}`
  }`;

  return [{ title }];
}

export default function User({ loaderData }: Route.ComponentProps) {
  const post = loaderData?.post;
  const { data: attests } = useAttestations(
    `${window.location.origin}/p/${post?.uid}`
  );
  console.log("----- Post ---", post, attests);

  return (
    <BaseLayout
      renderHeader={
        <span className="flex items-center">
          <div className="mr-2 h-7 w-7 rounded-full bg-blue-600" />
          <StyledName fullname={post?.author ?? ""} />
        </span>
      }
    >
      {post && (
        <div className="container mx-auto max-w-screen-sm">
          <div className="relative flex w-full border-c1 border-b">
            <h1 className="px-4 pt-8 pb-6 text-xl">{post?.title}</h1>
            <span className="absolute right-2 bottom-2 flex items-center gap-1 text-right text-xs opacity-70">
              <Clock size={18} />
              {new Date(String(post.publishedAt)).toLocaleString()}
            </span>
          </div>
          {post?.price && post?.price > 0 ? (
            <>
              <div className="px-4 py-8">
                <MarkdownPreview markdown={post?.preview ?? ''} />
              </div>
              <div className="flex items-center justify-between border-c1 border-t border-b border-dashed p-4">
                <span className="pricetag">
                  $ {post.price}
                  <span className="triangle" />
                  <span className="hole" />
                </span>
                <button className="underline" type="button">
                  Unlock this content
                  <img src={x402Logo} width={120} alt="x402" />
                </button>
              </div>
            </>
          ) : (
            <div className="border-c1 border-b px-4 py-8">
              <MarkdownPreview markdown={post?.content ?? ''} />
            </div>
          )}
          <div className="pt-16">
            <div className="flex items-center gap-2 border-c1 border-b px-4 py-2">
              <UserList size={24} />
              Attestations
            </div>
            {attests && attests.length > 0 ? (
              <ul className="flex w-full flex-col">
                {attests.map((item) => (
                  <li
                    key={item.id}
                    className="relative min-h-16 border-c1 border-b px-4 py-3"
                  >
                    <div className="flex items-center gap-4 pt-1 pb-3">
                      <div className="flex items-center">
                        <div className="mr-2 h-5 w-5 rounded-full bg-accent" />
                        <Link className="text-sm" to={`/${item.attesterName}`}>
                          <StyledName fullname={post?.author ?? ""} />
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      {item?.message && (
                        <div className="flex items-start gap-1 rounded-lg bg-c1 py-1.5 pr-6 pl-4 text-xs">
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
              <p className="py-12 text-center opacity-70">No attests yet</p>
            )}
          </div>
        </div>
      )}
    </BaseLayout>
  );
}
