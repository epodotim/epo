CREATE TABLE `Post` (
	`id` text PRIMARY KEY NOT NULL,
	`uid` text NOT NULL,
	`owner` text NOT NULL,
	`address` text,
	`label` text,
	`title` text,
	`content` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`publishedAt` text,
	`cid` text
);
--> statement-breakpoint
CREATE INDEX `owner` ON `Post` (`owner`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `Post` (`createdAt`);--> statement-breakpoint
CREATE INDEX `updated_at_idx` ON `Post` (`updatedAt`);--> statement-breakpoint
CREATE INDEX `cid_idx` ON `Post` (`cid`);--> statement-breakpoint
CREATE INDEX `published_at_idx` ON `Post` (`publishedAt`);--> statement-breakpoint
CREATE INDEX `owner_label_idx` ON `Post` (`owner`,`label`);--> statement-breakpoint
CREATE TABLE `PostMeta` (
	`id` text PRIMARY KEY NOT NULL,
	`postId` text NOT NULL,
	`tag` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `postId_idx` ON `PostMeta` (`postId`);--> statement-breakpoint
CREATE INDEX `tag_idx` ON `PostMeta` (`tag`);