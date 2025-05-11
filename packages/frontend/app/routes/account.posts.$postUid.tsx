import type { Route } from "./+types/account.posts._index";
import * as schema from "./../../db/schema";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Dashboard | EPO" }];
}

export async function action({ request, context, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("content");
  const content = formData.get("content");

  const data = {
    // example
    title: formData.get("title"),
    content: formData.get("content"),
  };

  try {
    await context.db.insert(schema.post).values(data).onConflictDoUpdate({
      target: params.postUid,
      set: data,
    });
  } catch (error) {
    return { errror: "Error adding to post" };
  }
}

export async function loader({ context, params }: Route.ActionArgs) {
  const postUid = params.postUid as string;
  const post = await context.db.query.post.findFirst({
    where: (post, { eq }) => eq(post.uid, postUid),
    with: {
      post_meta: true,
    },
  });

  console.log("----- Dashboard Post ---", postUid, post);

  return {
    post,
  };
}

export default function DashboardPostEdit({
  loaderData,
}: Route.ComponentProps) {
  console.log("----- Dashboard Post ---", loaderData?.post);

  return (
    <>
      <h1>{loaderData?.post?.title ?? ""}</h1>
      <ul className="">{loaderData?.post?.content ?? ""}</ul>
    </>
  );
}
