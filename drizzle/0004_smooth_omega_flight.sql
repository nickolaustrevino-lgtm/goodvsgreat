ALTER TABLE `subscribers` ADD `confirmToken` varchar(128);--> statement-breakpoint
ALTER TABLE `subscribers` ADD `confirmedAt` timestamp;