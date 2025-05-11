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
  });

  return {
    posts,
  };
}

export default function DashboardPosts({ loaderData }: Route.ComponentProps) {
  console.log("----- Dashboard Posts ---", loaderData?.posts);

  return (
    <>
      <h1>User Posts</h1>
      <ul className="border-b border-black w-full">
        {loaderData?.posts?.map((post) => (
          <li key={post.id} className="border-t border-black p-6">
            <Link to={`/dashboard/posts/${post.uid}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
