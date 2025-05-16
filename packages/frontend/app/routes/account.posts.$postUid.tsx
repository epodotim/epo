import { eq } from "drizzle-orm";
import { redirect } from "react-router";
import * as schema from "db/schema";
import { useLocation } from "react-router";
import type { Route } from "./+types/account.posts.$postUid";
import { MarkdownEditor } from "~/components/Editor";

import shortUUID from "short-uuid";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { AccountLayout } from "~/components/Layouts";
import PaidToggle from "~/components/ui/PaidToggle";
import { useState } from "react";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Edit Post | EPO" }];
}

export async function action({ request, context, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const preview = formData.get("preview") as string;
  const price = Number(formData.get("price"))

  // 共通データ
  const data = {
    title,
    content,
    preview,
    price: price > 0 ? price : null,
    author: "user123",
  };

  try {
    if (params.postUid === "new") {
      // new
      await context.db.insert(schema.post).values({
        ...data,
        uid: shortUUID.generate(),
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

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  preview: z.string().optional(),
  price: z.number().optional(),
});
type PostFormType = z.infer<typeof postSchema>;

export default function AccountPostEditPage({
  loaderData,
}: Route.ComponentProps) {
  const location = useLocation();

  const isNewPost = location.pathname === "/account/posts/new";

  const post = loaderData?.post;

  const [form, fields] = useForm<PostFormType>({
    id: "post-form",
    defaultValue: {
      title: isNewPost ? "" : (post?.title ?? ""),
      content: isNewPost ? "" : (post?.content ?? ""),
      preview: isNewPost ? "" : (post?.preview ?? ""),
      price: isNewPost ? 0 : (post?.price ?? 0),
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postSchema });
    },
    shouldValidate: "onBlur",
  });
  const [contentMarkdown, setContentMarkdown] = useState(
    fields.content.value ?? "",
  );
  const [previewMarkdown, setPreviewMarkdown] = useState(
    fields.preview.value ?? "",
  );
  const [isPaid, setIsPaid] = useState(
    isNewPost ? false : post?.price ? post.price > 0 : false,
  );

  return (
    <AccountLayout title="Edit Post">
      <div className="container mx-auto max-w-screen-sm">
        <PaidToggle
          value={isPaid ? "paid" : "free"}
          onChange={(val) => {
            setIsPaid(val === "paid");
          }}
        />
        <form
          method="post"
          {...getFormProps(form)}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col">
            <label htmlFor={fields.title.id}>Title</label>
            <input
              {...getInputProps(fields.title, {
                type: "text",
                id: fields.title.id,
              })}
            />
          </div>
          {isPaid && (
            <div className="flex flex-col">
              <label htmlFor={fields.preview.id}>Preview</label>
              <>
                <input
                  {...getInputProps(fields.preview, { type: "hidden" })}
                  value={previewMarkdown}
                />
                <MarkdownEditor
                  markdown={previewMarkdown}
                  onChange={(updated) => setPreviewMarkdown(updated)}
                />
              </>
            </div>
          )}
          <div className="flex flex-col">
            <label htmlFor={fields.content.id}>Content</label>
            <>
              <input
                {...getInputProps(fields.content, { type: "hidden" })}
                value={contentMarkdown}
              />
              <MarkdownEditor
                markdown={contentMarkdown}
                onChange={(updated) => setContentMarkdown(updated)}
              />
            </>
          </div>
          {/* <MarkdownEditor /> */}
          {isPaid && (
            <div className="flex flex-col">
              <label htmlFor={fields.price.id}>Price</label>
              <input
                {...getInputProps(fields.price, { type: "text" })}
              />
            </div>
          )}
          <button type="submit">{isNewPost ? "Submit" : "更新"}</button>
        </form>
      </div>
    </AccountLayout>
  );
}
