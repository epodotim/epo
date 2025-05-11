import { sql } from "drizzle-orm";
import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const post = sqliteTable(
  "Post",
  {
    id: text().primaryKey().notNull(),
    uid: text().notNull(), // short UUID for post `'73WakrfVbNJBaAmhQtEeDv'`
    owner: text().notNull(), // owner name `user.base.eth` or `user.epo.im`
    address: text(), // optioanal
    label: text(),
    title: text(),
    content: text(),
    preview: text(), // oprional: content preview
    createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    publishedAt: text(),
    cid: text(),
  },
  (t) => [
    index("owner").on(t.owner),
    index("created_at_idx").on(t.createdAt),
    index("updated_at_idx").on(t.updatedAt),
    index("cid_idx").on(t.cid),
    index("published_at_idx").on(t.publishedAt),
    index("owner_label_idx").on(t.owner, t.label),
  ],
);

export const tag = sqliteTable(
  "PostMeta",
  {
    id: text().primaryKey().notNull(),
    postId: text().notNull(),
    tag: text().notNull(),
    createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (t) => [index("postId_idx").on(t.postId), index("tag_idx").on(t.tag)],
);
