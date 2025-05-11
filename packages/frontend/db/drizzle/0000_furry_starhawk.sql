CREATE TABLE `post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uid` text NOT NULL,
	`author` text NOT NULL,
	`address` text,
	`label` text,
	`title` text,
	`content` text,
	`preview` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`publishedAt` text,
	`cid` text
);
--> statement-breakpoint
CREATE INDEX `uid_idx` ON `post` (`uid`);--> statement-breakpoint
CREATE INDEX `author` ON `post` (`author`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `post` (`createdAt`);--> statement-breakpoint
CREATE INDEX `updated_at_idx` ON `post` (`updatedAt`);--> statement-breakpoint
CREATE INDEX `cid_idx` ON `post` (`cid`);--> statement-breakpoint
CREATE INDEX `published_at_idx` ON `post` (`publishedAt`);--> statement-breakpoint
CREATE INDEX `author_label_idx` ON `post` (`author`,`label`);--> statement-breakpoint
CREATE TABLE `post_meta` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`postId` integer NOT NULL,
	`postUid` text NOT NULL,
	`mKey` text,
	`mValue` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `post_id_idx` ON `post_meta` (`postId`);--> statement-breakpoint
CREATE INDEX `post_uid_idx` ON `post_meta` (`postId`);--> statement-breakpoint
CREATE INDEX `m_key_idx` ON `post_meta` (`mKey`);