import { eq } from "drizzle-orm";
import { redirect } from "react-router";
import type { Route } from "./+types/account.posts.$postUid";
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

  // 共通データ
  const data = {
    title: title,
    content: content,
    author: "user123",
  };

  try {
    if (params.postUid === "new") {
      // 新規登録
      await context.db.insert(schema.post).values({
        ...data,
        uid: uuidv4(),
      });
    } else if (params.postUid) {
      // 編集
      await context.db.update(schema.post).set(data).where(eq(schema.post.uid, params.postUid));
    } else {
      // 不正なパス
      return { error: "Invalid postUid" };
    }
    // 正常終了時は一覧ページへリダイレクト
    return redirect("/account/posts");
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

  // 投稿データ取得
  const post = loaderData?.post;

  // conform useFormセットアップ
  const [form, fields] = useForm<{ title: string; content: string }>({
    id: "post-form",
    defaultValue: {
      title: isNewPost ? "" : post?.title ?? "",
      content: isNewPost ? "" : post?.content ?? "",
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <>
      <form method="post" {...getFormProps(form)}>
        <label htmlFor={fields.title.id}>Title</label>
        <input
          {...getInputProps(fields.title, { type: "text", id: fields.title.id })}
        />
        <label htmlFor={fields.content.id}>Content</label>
        <textarea
          {...getTextareaProps(fields.content)}
        />
        <button type="submit">{isNewPost ? "Submit" : "更新"}</button>
      </form>
    </>
  );
}
