// I have decided to use PostgreSQL for my Primary DB and my Module is Reviews

// Below are tables related to Reviews

const { Client } = require('pg');

const client = new Client({
  database: 'review'
})

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})



DROP TABLE IF EXISTS `Review`;

CREATE TABLE `Review` (
  `id` INT AUTO_INCREMENT DEFAULT NOT NULL,
  `product_id` INT NULL DEFAULT NULL,
  `page` INT DEFAULT 1,
  `count` INT DEFAULT 5,
  `results` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Result`;

CREATE TABLE `Result` (
  `id` INT AUTO_INCREMENT DEFAULT NOT NULL,
  `product` INT,
  `review_id` INT NULL DEFAULT NULL,
  `rating` INT NULL DEFAULT NULL,
  `summary` VARCHAR NULL DEFAULT NULL,
  `recommended` MEDIUMTEXT NULL DEFAULT NULL,
  `response` VARCHAR NULL DEFAULT NULL,
  `body` MEDIUMTEXT NULL DEFAULT NULL,
  `date` TIMESTAMP NULL DEFAULT NULL,
  `reviewer_name` MEDIUMTEXT NULL DEFAULT NULL,
  `helpfulness` INT NULL DEFAULT NULL,
  `photos` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
  FOREIGN KEY (`product`) REFERENCES Reviews(product_id)
);


DROP TABLE IF EXISTS `photos`;

CREATE TABLE `Photos` (
  `id` INT AUTO_INCREMENT DEFAULT NOT NULL,
  `photo_id` MEDIUMTEXT NULL DEFAULT NULL,
  `product_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
  FOREIGN KEY (`photo_id`) REFERENCES Results(review_id)
);

// Below are Tables related to MetaData

DROP TABLE IF EXISTS `MetaData`;

CREATE TABLE `MetaData` (
  `id` INT AUTO_INCREMENT DEFAULT NOT NULL,
  `product_id` INT NULL DEFAULT NULL,
  `recommended` INT,
  `ratings` INT,
  `width` INT,
  `size` INT,
  `comfort` INT,
  `quality` INT,
  PRIMARY KEY (`id`)
  FOREIGN KEY (`recommended`) REFERENCES Recommended(`id`)
  FOREIGN KEY (`ratings`) REFERENCES Ratings(`id`)
  FOREIGN KEY (`width`) REFERENCES Width(`id`)
  FOREIGN KEY (`size`) REFERENCES Size(`id`)
  FOREIGN KEY (`comfort`) REFERENCES Comfort(`id`)
  FOREIGN KEY (`quality`) REFERENCES Quality(`id`)
);

DROP TABLE IF EXISTS `Rating`;

CREATE TABLE `Rating` (
  `id` INT AUTO_INCREMENT DEFAULT NOT NULL,
  `1` INT,
  `2` INT,
  `3` INT,
  `4` INT,
  `5` INT,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Width`;

CREATE TABLE `Width` (
  `id` INT AUTO_INCREMENT DEFAULT NOT NULL,
  characteristic_id INT,
  value TEXT,
  PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `Size`;

CREATE TABLE `Size` (
  `id` INT AUTO_INCREMENT DEFAULT NOT NULL,
  characteristic_id INT,
  value TEXT,
  PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `Comfort`;

CREATE TABLE `Comfort` (
  `id` INT AUTO_INCREMENT DEFAULT NOT NULL,
  characteristic_id INT,
  value TEXT,
  PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `Quality`;

CREATE TABLE `Quality` (
  `id` INT AUTO_INCREMENT DEFAULT NOT NULL,
  characteristic_id INT,
  value TEXT,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Recommended`;

CREATE TABLE `Recommended` (
  `id` INT AUTO_INCREMENT DEFAULT NOT NULL,
  `false` INT,
  `true` INT,
  PRIMARY KEY (`id`)
)






// Use these when entering data into the database
// INSERT INTO `Reviews` (`id`,`product_id`,`page`,`count`,`results`) VALUES
// (?,?,?,?,?);
// INSERT INTO `results` (`id`,`review_id`,`rating`,`summary`,`recommended`,`response`,`body`,`date`,`reviewer_name`,`helpfulness`,`photos`) VALUES
// (?,?,?,?,?,?,?,?,?,?,?);
// INSERT INTO `photos` (`id`,`url`,`product_id`) VALUES
// (?,?,?);
// INSERT INTO `metaData` (`id`, `product_id`, `ratings`) VALUES ( ?, ?, ?)

// INSERT INTO `characteristics` (`id`, `Size`, `Width`, `Comfort`, `Quality`, `product`) VALUES ( ?, ?, ?, ?, ?)

// INSERT INTO `recommended` (`id`, `false`, `true`) VALUES ( ?, ?, ?)