import { PostLayout } from "~/components/Layouts";
import type { Route } from "./+types/p.$postUid";
import x402Logo from "~/assets/x402-button-small.png";

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
  console.log("----- User ---", post);

  return (
    <PostLayout
      renderHeader={
        <span className="flex items-center">
          <div className="mr-2 h-7 w-7 rounded-full bg-blue-600" />
          <strong>xxxxx</strong>
          <span className="opacity-80">.epo.im</span>
        </span>
      }
    >
      {post && (
        <div className="container mx-auto max-w-screen-sm">
          <h1 className="px-2 pt-10 pb-6 text-xl">{post?.title}</h1>
          <div>{post?.content}</div>
          <hr />
          <div className="px-4 py-6">
            <h2>The standard Lorem Ipsum passage, used since the 1500s</h2>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </div>
          <div className="flex items-center justify-between border-c1 border-t border-b border-dashed p-4">
            <span className="pricetag">
              $15
              <span className="triangle" />
              <span className="hole" />
            </span>
            <button className="underline" type="button">
              Unlock this content
              <img src={x402Logo} width={120} alt="x402" />
            </button>
          </div>
          <div className="flex items-center justify-between border-c1 border-b border-dashed p-4">
            .....
          </div>
          <div>Comments</div>
        </div>
      )}
    </PostLayout>
  );
}
