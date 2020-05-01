CREATE DATABASE event_calendar;

USE event_calendar;

CREATE TABLE `User` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(45) NOT NULL,
	`surname` VARCHAR(45) NOT NULL,
	`Company_position` VARCHAR(90),
	`email` VARCHAR(45) NOT NULL UNIQUE,
	`password` VARCHAR(45) NOT NULL,
	`confirmed` BOOL NOT NULL,
	PRIMARY KEY (`id`)
);

# RUNNED BEFORE IT IN YAROSLAV'S COMPUTER

CREATE TABLE `Event` (
	`id` int NOT NULL AUTO_INCREMENT,
	`Topic_id` int NOT NULL,
	`description` TEXT NOT NULL,
	`date` DATE NOT NULL,
	`time` TIME NOT NULL,
	`duration` double NOT NULL,
	`link` TEXT NOT NULL,
	`location` TEXT NOT NULL,
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
	`location` TEXT NOT NULL,
	`department` TEXT NOT NULL,
	`position` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Topic` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(200) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

ALTER TABLE `User` ADD CONSTRAINT `User_fk0` FOREIGN KEY (`Company_position`) REFERENCES `Institution`(`position`);

ALTER TABLE `Event` ADD CONSTRAINT `Event_fk0` FOREIGN KEY (`Topic_id`) REFERENCES `Topic`(`id`);

ALTER TABLE `Event` ADD CONSTRAINT `Event_fk1` FOREIGN KEY (`location`) REFERENCES `Institution`(`location`);

ALTER TABLE `User_Calend` ADD CONSTRAINT `User_Calend_fk0` FOREIGN KEY (`Event_id`) REFERENCES `Event`(`id`);

ALTER TABLE `User_Calend` ADD CONSTRAINT `User_Calend_fk1` FOREIGN KEY (`User_id`) REFERENCES `User`(`id`);

