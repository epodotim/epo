import { eq } from "drizzle-orm";
import type { Route } from "./+types/account.posts._index";
import * as schema from "./../../db/schema";
import { useParams, useLocation } from "react-router";

import { v4 as uuidv4 } from 'uuid';
import { useForm, getFormProps, getInputProps, getTextareaProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Dashboard | EPO" }];
}


export async function action({ request, context, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  console.log("action formData:", { title, content });
  const uid = uuidv4();

  const data = {
    // example
    title: title,
    content: content,
    author: "user123",
    uid: uid,
  };

  try {
    if (params.postUid && params.postUid !== "new") {
      await context.db.update(schema.post).set(data).where(eq(schema.post.uid, params.postUid));
    } else {
      await context.db.insert(schema.post).values(data);
    }
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
  const { postUid } = useParams();
  const location = useLocation();

  const isNewPost = location.pathname === "/account/posts/new";

  // zodスキーマ定義
  const postSchema = z.object({
    title: z.string(),
    content: z.string(),
  });

  // conform useFormセットアップ
  const [form, fields] = useForm<{ title: string; content: string }>({
    id: "post-form",
    defaultValue: {
      title: "",
      content: "",
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postSchema });
    },
    shouldValidate: "onBlur",
  });

  // 投稿データ取得
  const post = loaderData?.post;

  return (
    <>
      <h1>{post?.title ?? ""}</h1>
      <ul className="">{post?.content ?? ""}</ul>
      {isNewPost ? (
        // 新規投稿フォーム
        <form method="post" {...getFormProps(form)}>
          <label htmlFor={fields.title.id}>Title</label>
          <input
            {...getInputProps(fields.title, { type: "text", id: fields.title.id })}
          />
          <label htmlFor={fields.content.id}>Content</label>
          <textarea
            {...getTextareaProps(fields.content)}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        // 編集フォーム
        <div>編集フォーム (uid: {postUid})</div>
      )}
    </>
  );
}
