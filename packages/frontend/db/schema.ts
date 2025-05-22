import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const post = sqliteTable(
  "post",
  {
    id: integer({ mode: "number" })
      .primaryKey({ autoIncrement: true })
      .notNull(),
    uid: text().notNull(), // short UUID for post - `'73WakrfVbNJBaAmhQtEeDv'`
    author: text().notNull(), // owner name - `user.base.eth` or `user.kon.id`
    address: text(), // optioanal
    label: text(), // category
    title: text(),
    content: text(), // visible content for paid contents
    // contentProtected: text(), // protected content for paid contents
    coverImg: text(), // optional: cover image url
    price: integer(), // optional: price for paid contents
    priceToken: text(), // optional: priceToken for paid contents
    createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    publishedAt: text(),
    cid: text(),
  },
  (t) => [
    index("uid_idx").on(t.uid),
    index("author").on(t.author),
    index("created_at_idx").on(t.createdAt),
    index("updated_at_idx").on(t.updatedAt),
    index("cid_idx").on(t.cid),
    index("published_at_idx").on(t.publishedAt),
    index("author_label_idx").on(t.author, t.label),
  ],
);

export const post_meta = sqliteTable(
  "post_meta",
  {
    id: integer({ mode: "number" })
      .primaryKey({ autoIncrement: true })
      .notNull(),
    postId: integer().notNull(),
    postUid: text().notNull(),
    mKey: text(),
    mValue: text(),
    createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (t) => [
    index("post_id_idx").on(t.postId),
    index("post_uid_idx").on(t.postUid),
    index("m_key_idx").on(t.mKey),
  ],
);

export const post_protected = sqliteTable(
  "post_protected",
  {
    id: integer({ mode: "number" })
      .primaryKey({ autoIncrement: true })
      .notNull(),
    postId: integer().notNull(),
    postUid: text().notNull(),
    content: text(),
    createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (t) => [
    index("post_id_idx").on(t.postId),
    index("post_uid_idx").on(t.postUid),
  ],
);

export const postRelations = relations(post, ({ one, many }) => ({
  post_protected: one(post_protected),
  post_meta: many(post_meta),
}));

export const postProtectedRelations = relations(post_protected, ({ one }) => ({
  post: one(post, {
    fields: [post_protected.postUid],
    references: [post.uid],
  }),
}));

export const postMetaRelations = relations(post_meta, ({ one }) => ({
  post: one(post, { fields: [post_meta.postUid], references: [post.uid] }),
}));
