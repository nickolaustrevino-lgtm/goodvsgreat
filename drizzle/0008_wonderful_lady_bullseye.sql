CREATE TABLE `email_dispatches` (
	`id` int AUTO_INCREMENT NOT NULL,
	`kind` varchar(64) NOT NULL,
	`recipient` varchar(320) NOT NULL,
	`subject` varchar(512) NOT NULL,
	`status` enum('accepted','failed') NOT NULL,
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `email_dispatches_id` PRIMARY KEY(`id`)
);
