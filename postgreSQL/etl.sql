
DROP TABLE IF EXISTS customer_review;
DROP TABLE IF EXISTS photo;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS characteristic_reviews;

CREATE TABLE IF NOT EXISTS customer_review (
  id BIGSERIAL PRIMARY KEY,
  product_id INTEGER,
  rating INTEGER,
  date BIGINT,
  summary TEXT,
  body TEXT,
  recommend TEXT,
  reported BOOLEAN DEFAULT false NOT NULL,
  reviewer_name TEXT,
  reviewer_email TEXT,
  response TEXT,
  helpfulness INTEGER
);

CREATE TABLE IF NOT EXISTS photo (
  id BIGSERIAL PRIMARY KEY,
  review_id INT,
  url TEXT
);


CREATE TABLE IF NOT EXISTS characteristics (
  id BIGSERIAL PRIMARY KEY,
  product_id INT,
  name TEXT
);

CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id BIGSERIAL PRIMARY KEY,
  characteristic_id INT,
  review_id INT,
  value INT
);