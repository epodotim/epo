import { Link } from "react-router";
import type { Route } from "./+types/account.posts._index";
import { AccountLayout } from "~/components/Layouts";

export function meta(_: Route.MetaArgs) {
  return [{ title: "My Posts | EPO" }];
}

export async function loader({ context }: Route.LoaderArgs) {
  const posts = await context.db.query.post.findMany({
    // where: (post, { eq }) => eq(post.author, "xxx.base.eth"),
    with: {
      post_meta: true,
    },
    orderBy: (post, { desc }) => [desc(post.createdAt)],
  });

  return {
    posts,
  };
}

export default function AccountPostsPage({ loaderData }: Route.ComponentProps) {
  return (
    <AccountLayout title="My Posts">
      <div className="container mx-auto max-w-screen-sm">
        <div className="w-full border-black border-b">
          {loaderData?.posts?.map((post) => (
            <div
              key={post.id}
              className="flex flex-row items-center gap-4 border-black border-t p-6"
            >
              <Link
                to={`/account/posts/${post.uid}`}
                className="font-bold flex-1"
              >
                {post.title}
              </Link>
              <span className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AccountLayout>
  );
}
