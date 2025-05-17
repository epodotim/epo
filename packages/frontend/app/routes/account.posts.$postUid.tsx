import * as schema from "db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "react-router";
import { useLocation } from "react-router";
import { MarkdownEditor } from "~/components/Editor";
import type { Route } from "./+types/account.posts.$postUid";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import shortUUID from "short-uuid";
import { z } from "zod";
import { AccountLayout } from "~/components/Layouts";
import { ToggleSelector } from "~/components/ui/ToggleSelector";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Edit Post | EPO" }];
}

export async function action({ request, context, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const preview = formData.get("preview") as string;
  const coverImg = formData.get("coverImg") as string;
  const price = Number(formData.get("price"));

  const data = {
    title,
    content,
    preview,
    price: price > 0 ? price : null,
    coverImg,
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
  coverImg: z.string().optional(),
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
      title: isNewPost ? "" : post?.title ?? "",
      content: isNewPost ? "" : post?.content ?? "",
      preview: isNewPost ? "" : post?.preview ?? "",
      price: isNewPost ? 0 : post?.price ?? 0,
      coverImg: isNewPost ? "" : post?.coverImg ?? "",
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postSchema });
    },
    shouldValidate: "onBlur",
  });
  const [contentMarkdown, setContentMarkdown] = useState(
    fields.content.value ?? ""
  );
  const [previewMarkdown, setPreviewMarkdown] = useState(
    fields.preview.value ?? ""
  );
  const [isPaid, setIsPaid] = useState(
    isNewPost ? false : post?.price ? post.price > 0 : false
  );

  return (
    <AccountLayout title="Edit Post">
      <div className="content container mx-auto max-w-screen-sm py-8">
        <div>Plan</div>

        <ToggleSelector
          value={isPaid ? "paid" : "free"}
          onChange={(val) => setIsPaid(val === "paid")}
          options={[
            { label: "Free", value: "free", ariaLabel: "Free plan" },
            { label: "Paid", value: "paid", ariaLabel: "Paid plan" },
          ]}
          className="border-c2 mb-5"
        />
        <form
          method="post"
          {...getFormProps(form)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col">
            <label htmlFor={fields.title.id}>Title</label>
            <input
              {...getInputProps(fields.title, {
                type: "text",
                id: fields.title.id,
              })}
              className="border border-c2"
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
                  className="border border-c2"
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
                className="border border-c2"
              />
            </>
          </div>
          <div className="flex flex-col">
            <label htmlFor={fields.coverImg.id}>Cover image</label>
            <input
              {...getInputProps(fields.coverImg, { type: "text" })}
              className="border boder-c2"
            />
          </div>
          {isPaid && (
            <div className="flex flex-col">
              <label htmlFor={fields.price.id}>Price</label>
              <input
                {...getInputProps(fields.price, { type: "text" })}
                className="border boder-c2"
              />
            </div>
          )}
          <button type="submit" className="btn">
            {isNewPost ? "Submit" : "Update"}
          </button>
        </form>
      </div>
    </AccountLayout>
  );
}
