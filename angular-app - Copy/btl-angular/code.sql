DROP FUNCTION IF EXISTS `show_Clothes`;

CREATE DATABASE `show_Clothes` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
use `show_Clothes`;

CREATE TABLE `TAI_KHOAN`
(
	`id` int PRIMARY KEY AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
    `email` varchar(100) NOT NULL UNIQUE,
    `password` varchar(100) NOT NULL,
    `role` varchar(50) DEFAULT 'customer',
    `creaed_at` date DEFAULT current_timestamp(),
    `last_login` datetime DEFAULT current_timestamp()
)ENGINE = InnoDB;
CREATE TABLE `DANH_MUC`
(
	`id` int PRIMARY KEY AUTO_INCREMENT,
	`name` varchar(100) NOT NULL UNIQUE,
    `status` int
)ENGINE = InnoDB;
CREATE TABLE `SAN_PHAM`
(
	`id` int PRIMARY KEY AUTO_INCREMENT,
	`name` varchar(120) NOT NULL,
    `price` float NOT NULL,
    `sale_price` float,
    `image`varchar(200) NOT NULL,
    `category_id` int,
    FOREIGN KEY (`category_id`) REFERENCES `DANH_MUC`(`id`),
    `status` tinyint DEFAULT '1',
    `description` text NOT NULL,
    `created_at` date DEFAULT current_timestamp()
)ENGINE = InnoDB;
CREATE TABLE `YEU_THICH`
(
	`id` int PRIMARY KEY AUTO_INCREMENT,
    `account_id` int,
     FOREIGN KEY (`account_id`) REFERENCES `TAI_KHOAN`(`id`),
    `product_id` int,
    FOREIGN KEY (`product_id`) REFERENCES `SAN_PHAM`(`id`),
    `created_at` date DEFAULT current_timestamp()
)ENGINE = InnoDB;