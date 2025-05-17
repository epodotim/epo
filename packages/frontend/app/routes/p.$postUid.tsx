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
import Avatar from "~/components/Avatar";
import AttestConfirmDialog from "~/components/AttestForm";
import { useState } from "react";
import { useAccount } from "wagmi";
import { base } from "viem/chains";
import { useName } from "@coinbase/onchainkit/identity";

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

export default function Post({ loaderData }: Route.ComponentProps) {
  const post = loaderData?.post;
  const { data: attests } = useAttestations(
    `${window.location.origin}/p/${post?.uid}`
  );
  const { address } = useAccount();
  const { data: basename } = useName({ address, chain: base });

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  console.log("----- Post ---", post, attests);

  const isPurchased = false;

  return (
    <BaseLayout
      renderHeader={
        <Link to={`/${post?.author}`} className="flex items-center">
          <Avatar fullname={post?.author ?? ""} className="mr-2 h-7 w-7" />
          <StyledName fullname={post?.author ?? ""} />
        </Link>
      }
    >
      {post && (
        <div className="container mx-auto max-w-screen-sm">
          <div className="relative flex w-full border-c1 border-b">
            <h1 className="px-4 pt-8 pb-6 font-bold text-2xl">{post?.title}</h1>
            <span className="absolute right-2 bottom-2 flex items-center gap-1 text-right text-xs opacity-70">
              <Clock size={18} />
              {new Date(String(post.publishedAt)).toLocaleString()}
            </span>
          </div>
          {post?.price && post?.price > 0 ? (
            !isPurchased ? (
              <>
                <div className="md border-b border-dashed px-4 py-8">
                  <MarkdownPreview markdown={post?.preview ?? ""} />
                </div>
                <div className="flex items-center justify-between border-c1 border-b p-4">
                  <span className="pricetag">
                    $ {post.price}
                    <span className="triangle" />
                    <span className="hole" />
                  </span>
                  <button className="text-right underline" type="button">
                    Unlock this content
                    <img src={x402Logo} width={120} alt="x402" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="md border-b border-dashed px-4 py-8">
                  <MarkdownPreview markdown={post?.preview ?? ""} />
                </div>
                <div className="border-b border-dashed py-10 text-center text-lg opacity-70">
                  Thanks for your purchase! 🎉
                </div>
                <div className="md border-c1 border-b px-4 py-8">
                  <MarkdownPreview markdown={post?.content ?? ""} />
                </div>
              </>
            )
          ) : (
            <div className="md border-c1 border-b px-4 py-8">
              <MarkdownPreview markdown={post?.content ?? ""} />
            </div>
          )}
          <div className="pt-16">
            <div className="flex items-center justify-between border-c1 border-b px-4 py-2">
              <div className="flex items-center gap-2">
                <UserList size={24} />
                Attestations
              </div>
              <button
                className="btn px-4 py-1 text-sm"
                type="button"
                onClick={() => setConfirmOpen(true)}
              >
                Attest
              </button>
              <AttestConfirmDialog
                postUid={post?.uid}
                attesterName={basename ?? ""}
                recipientName={post?.author}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
              />
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
                        <Avatar
                          fullname={post?.author ?? ""}
                          className="mr-2 h-5 w-5"
                        />
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
                      href={`https://base.easscan.org/attestation/view/${item.id}`}
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
