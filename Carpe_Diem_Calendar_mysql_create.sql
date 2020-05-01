DROP TABLE IF EXISTS User, Event, User_Calend, Institution, Topic;
CREATE TABLE `User` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(200) NOT NULL,
	`surname` VARCHAR(200),
	`company_position` VARCHAR(200) UNIQUE,
	`e-mail` VARCHAR(200) NOT NULL UNIQUE,
	`password` VARCHAR(200) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Event` (
	`id` int NOT NULL AUTO_INCREMENT,
	`Topic_id` int NOT NULL,
	`description` TEXT,
	`date` DATE NOT NULL,
	`time` TIME NOT NULL,
	`duration` double NOT NULL,
	`link` VARCHAR(200),
	`location` VARCHAR(200) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `User_Calend` (
	`Event_id` int NOT NULL,
	`User_id` int NOT NULL,
	`attendance` TEXT NOT NULL,
	`role` TEXT NOT NULL
);

CREATE TABLE `Institution` (
	`id` int NOT NULL AUTO_INCREMENT,
	`location` VARCHAR(200) NOT NULL UNIQUE,
	`department` VARCHAR(200) NOT NULL,
	`position` VARCHAR(200) UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Topic` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(200) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

ALTER TABLE `User` ADD CONSTRAINT `User_fk0` FOREIGN KEY (`company_position`) REFERENCES `Institution`(`position`);

ALTER TABLE `Event` ADD CONSTRAINT `Event_fk0` FOREIGN KEY (`Topic_id`) REFERENCES `Topic`(`id`);

ALTER TABLE `Event` ADD CONSTRAINT `Event_fk1` FOREIGN KEY (`location`) REFERENCES `Institution`(`location`);

ALTER TABLE `User_Calend` ADD CONSTRAINT `User_Calend_fk0` FOREIGN KEY (`Event_id`) REFERENCES `Event`(`id`);

ALTER TABLE `User_Calend` ADD CONSTRAINT `User_Calend_fk1` FOREIGN KEY (`User_id`) REFERENCES `User`(`id`);

