import { Link } from "react-router";
import type { Route } from "./+types/account.posts._index";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Dashboard | EPO" }];
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
  console.log("----- Dashboard Posts ---", loaderData?.posts);

  return (
    <>
      <h1>User Posts</h1>
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
    </>
  );
}
