const { Client } = require('pg');

const client = new Client({
  database: 'review',
  // port: 5432,
  // username: '',
  // password: '',
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

// Below are tables related to Reviews

// client.query(`DROP TABLE IF EXISTS CustomerReview`)
client.query(`
CREATE TABLE IF NOT EXISTS customer_review (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  rating INTEGER,
  date TIMESTAMP DEFAULT current_timestamp,
  summary TEXT,
  body TEXT,
  recommend TEXT,
  reported INTEGER,
  reviewer_name TEXT,
  reviewer_email TEXT,
  response TEXT,
  helpfulness INTEGER
)
`)
  .then(() => (console.log('customer_review is loaded')))
  .catch((err) => (console.log(err)));

// client.query(`DROP TABLE IF EXISTS Photo`)
client.query(`
CREATE TABLE IF NOT EXISTS Photo (
  id SERIAL PRIMARY KEY,
  review_id INT,
  url TEXT,
  FOREIGN KEY (review_id) REFERENCES customer_review(id)
);
`)
  .then(() => (console.log('review_photo is loaded')))
  .catch((err) => (console.log(err)));

// client.query(`DROP TABLE IF EXISTS characteristic`)
// client.query(`
// CREATE TABLE Photo (
//   id INT SERIAL,
//   review_id INT,
//   url TEXT,
//   PRIMARY KEY (id)
//   FOREIGN KEY (review_id) REFERENCES Review(id)
// );
// `)

// Below are Tables related to MetaData

// client.query(`DROP TABLE IF EXISTS Review`)
// client.query(`
// CREATE TABLE Review (
//   id SERIAL,
//   product_id INT,
//   page INT DEFAULT 1,
//   count INT DEFAULT 5,
//   results INT,
//   PRIMARY KEY (id)
// )
// `)

// ____ below is review table_____
// DROP TABLE IF EXISTS Review;
// CREATE TABLE Review (
//   id INT SERIAL,
//   product_id INT,
//   rating INT,
//   date TIMESTAMP,
//   summary VARCHAR,
//   body MEDIUMTEXT,
//   recommend MEDIUMTEXT,
//   reported INT,
//   reviewer_name MEDIUMTEXT,
//   reviewer_email
//   response VARCHAR,
//   helpfulness INT,
//   PRIMARY KEY (id)
//   FOREIGN KEY (product) REFERENCES Reviews(product_id)
// );
// _________BELOW IS TABLE FOR PHOTOS REVIEWS______
// DROP TABLE IF EXISTS Photo;

// CREATE TABLE Photo (
//   id INT SERIAL,
//   review_id INT,
//   url TEXT,
//   PRIMARY KEY (id)
//   FOREIGN KEY (review_id) REFERENCES Review(id)
// );

//     DROP TABLE IF EXISTS `MetaData`;

//     CREATE TABLE `MetaData` (
//       `id` INT SERIAL,
//       `product_id` INT NULL DEFAULT NULL,
//       `recommended` INT,
//   `ratings` INT,
//   `width` INT,
//   `size` INT,
//   `comfort` INT,
//   `quality` INT,
//   PRIMARY KEY (`id`)
//   FOREIGN KEY (`recommended`) REFERENCES Recommended(`id`)
//   FOREIGN KEY (`ratings`) REFERENCES Ratings(`id`)
//   FOREIGN KEY (`width`) REFERENCES Width(`id`)
//   FOREIGN KEY (`size`) REFERENCES Size(`id`)
//   FOREIGN KEY (`comfort`) REFERENCES Comfort(`id`)
//   FOREIGN KEY (`quality`) REFERENCES Quality(`id`)
// );

// DROP TABLE IF EXISTS `Rating`;

// CREATE TABLE `Rating` (
//   `id` INT SERIAL,
//   `1` INT,
//   `2` INT,
//   `3` INT,
//   `4` INT,
//   `5` INT,
//   PRIMARY KEY (`id`)
// );

// DROP TABLE IF EXISTS `Width`;

// CREATE TABLE `Width` (
//   `id` INT SERIAL,
//   characteristic_id INT,
//   value TEXT,
//   PRIMARY KEY (`id`)
// );
// DROP TABLE IF EXISTS `Size`;

// CREATE TABLE `Size` (
//   `id` INT SERIAL,
//   characteristic_id INT,
//   value TEXT,
//   PRIMARY KEY (`id`)
// );
// DROP TABLE IF EXISTS `Comfort`;

// CREATE TABLE `Comfort` (
//   `id` INT SERIAL,
//   characteristic_id INT,
//   value TEXT,
//   PRIMARY KEY (`id`)
// );
// DROP TABLE IF EXISTS `Quality`;

// CREATE TABLE `Quality` (
//   `id` INT SERIAL,
//   characteristic_id INT,
//   value TEXT,
//   PRIMARY KEY (`id`)
// );

// DROP TABLE IF EXISTS `Recommended`;

// CREATE TABLE `Recommended` (
//   `id` INT SERIAL,
//   `false` INT,
//   `true` INT,
//   PRIMARY KEY (`id`)
// )

// Use these when entering data into the database
// INSERT INTO `Reviews` (`id`,`product_id`,`page`,`count`,`results`) VALUES
// (?,?,?,?,?);
// INSERT INTO `results` (`id`,`review_id`,`rating`,`summary`,
// `recommended`,`response`,`body`,`date`,`reviewer_name`,`helpfulness`
// ,`photos`) VALUES
// (?,?,?,?,?,?,?,?,?,?,?);
// INSERT INTO `photos` (`id`,`url`,`product_id`) VALUES
// (?,?,?);
// INSERT INTO `metaData` (`id`, `product_id`, `ratings`) VALUES ( ?, ?, ?)

// INSERT INTO `characteristics` (`id`,
// `Size`, `Width`, `Comfort`, `Quality`, `product`)
//  VALUES ( ?, ?, ?, ?, ?)

// INSERT INTO `recommended` (`id`, `false`, `true`) VALUES ( ?, ?, ?)
