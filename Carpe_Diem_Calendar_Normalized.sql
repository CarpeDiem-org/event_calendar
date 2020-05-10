CREATE TABLE `User` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	`surname` varchar(100) NOT NULL,
	`e-mail` varchar(100) NOT NULL UNIQUE,
	`password` varchar(50) UNIQUE,
	`invited` varchar(10) NOT NULL,
	`verified` bool NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Event` (
	`id` int NOT NULL AUTO_INCREMENT,
	`description` TEXT NOT NULL,
	`date` DATE NOT NULL,
	`time` TIME NOT NULL,
	`duration` double NOT NULL,
	`link` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `User_Calendar` (
	`id` int NOT NULL AUTO_INCREMENT,
	`event_id` int NOT NULL,
	`author_id` int NOT NULL,
	`attendance` varchar(10) NOT NULL,
	`role` varchar(20) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Company` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Topic` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Department` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Position` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Event_to_topic` (
	`event_id` int NOT NULL AUTO_INCREMENT,
	`topic_id` bigint NOT NULL,
	PRIMARY KEY (`event_id`,`topic_id`)
);

CREATE TABLE `Location` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	`address` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Work_plan` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`department_id` int NOT NULL,
	`position_id` int NOT NULL,
	`company_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Company_location` (
	`location_id` int NOT NULL,
	`company_id` int NOT NULL,
	PRIMARY KEY (`location_id`,`company_id`)
);

CREATE TABLE `Event_location` (
	`event_id` int NOT NULL,
	`location_id` int NOT NULL,
	PRIMARY KEY (`event_id`,`location_id`)
);

ALTER TABLE `User_Calendar` ADD CONSTRAINT `User_Calendar_fk0` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`);

ALTER TABLE `User_Calendar` ADD CONSTRAINT `User_Calendar_fk1` FOREIGN KEY (`author_id`) REFERENCES `User`(`id`);

ALTER TABLE `Event_to_topic` ADD CONSTRAINT `Event_to_topic_fk0` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`);

ALTER TABLE `Event_to_topic` ADD CONSTRAINT `Event_to_topic_fk1` FOREIGN KEY (`topic_id`) REFERENCES `Topic`(`id`);

ALTER TABLE `Work_plan` ADD CONSTRAINT `Work_plan_fk0` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`);

ALTER TABLE `Work_plan` ADD CONSTRAINT `Work_plan_fk1` FOREIGN KEY (`department_id`) REFERENCES `Department`(`id`);

ALTER TABLE `Work_plan` ADD CONSTRAINT `Work_plan_fk2` FOREIGN KEY (`position_id`) REFERENCES `Position`(`id`);

ALTER TABLE `Work_plan` ADD CONSTRAINT `Work_plan_fk3` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`);

ALTER TABLE `Company_location` ADD CONSTRAINT `Company_location_fk0` FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`);

ALTER TABLE `Company_location` ADD CONSTRAINT `Company_location_fk1` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`);

ALTER TABLE `Event_location` ADD CONSTRAINT `Event_location_fk0` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`);

ALTER TABLE `Event_location` ADD CONSTRAINT `Event_location_fk1` FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`);
