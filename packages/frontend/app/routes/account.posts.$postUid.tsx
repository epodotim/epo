import { eq } from "drizzle-orm";
import { redirect } from "react-router";
import * as schema from "db/schema";
import { useParams, useLocation } from "react-router";
import type { Route } from "./+types/account.posts.$postUid";

import { v4 as uuidv4 } from "uuid";
import {
  useForm,
  getFormProps,
  getInputProps,
  getTextareaProps,
} from "@conform-to/react";
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
      // new
      await context.db.insert(schema.post).values({
        ...data,
        uid: uuidv4(),
      });
    } else if (params.postUid) {
      // edit
      await context.db
        .update(schema.post)
        .set(data)
        .where(eq(schema.post.uid, params.postUid));
    } else {
      return { error: "Invalid postUid" };
    }
    return redirect("/account/posts");
  } catch (error: any) {
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

  return {
    post,
  };
}

export default function AccountPostEditPage({
  loaderData,
}: Route.ComponentProps) {
  const { postUid } = useParams();
  const location = useLocation();

  const isNewPost = location.pathname === "/account/posts/new";

  const postSchema = z.object({
    title: z.string(),
    content: z.string(),
  });

  const post = loaderData?.post;

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
          {...getInputProps(fields.title, {
            type: "text",
            id: fields.title.id,
          })}
        />
        <label htmlFor={fields.content.id}>Content</label>
        <textarea {...getTextareaProps(fields.content)} />
        <button type="submit">{isNewPost ? "Submit" : "更新"}</button>
      </form>
    </>
  );
}
