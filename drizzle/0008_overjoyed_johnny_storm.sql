CREATE TABLE `instagram_posts` (
	`id` varchar(64) NOT NULL,
	`post_type` enum('IMAGE','VIDEO','CAROUSEL_ALBUM') NOT NULL DEFAULT 'IMAGE',
	`caption` text,
	`link` varchar(512) NOT NULL,
	`likes` int NOT NULL DEFAULT 0,
	`comments` int NOT NULL DEFAULT 0,
	`thumbnail_url` varchar(1024),
	`posted_at` datetime NOT NULL,
	`synced_at` datetime NOT NULL,
	CONSTRAINT `instagram_posts_id` PRIMARY KEY(`id`)
);
