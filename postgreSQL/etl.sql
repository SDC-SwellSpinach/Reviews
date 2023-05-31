
DROP TABLE IF EXISTS customer_review CASCADE;
DROP TABLE IF EXISTS photo CASCADE;
DROP TABLE IF EXISTS characteristics CASCADE;
DROP TABLE IF EXISTS characteristic_reviews CASCADE;

CREATE TABLE IF NOT EXISTS customer_review (
  id BIGSERIAL PRIMARY KEY,
  product_id INTEGER,
  rating INTEGER,
  date BIGINT,
  summary TEXT,
  body TEXT,
  recommend BOOLEAN DEFAULT true NOT NULL,
  reported BOOLEAN DEFAULT false NOT NULL,
  reviewer_name TEXT,
  reviewer_email TEXT,
  response TEXT,
  helpfulness INTEGER
);

CREATE TABLE IF NOT EXISTS photo (
  id BIGSERIAL PRIMARY KEY,
  review_id INT REFERENCES customer_review (id),
  url TEXT
);


CREATE TABLE IF NOT EXISTS characteristics (
  id BIGSERIAL PRIMARY KEY,
  product_id INT,
  name TEXT
);

CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id BIGSERIAL PRIMARY KEY,
  characteristic_id INT REFERENCES characteristics (id),
  review_id INT REFERENCES customer_review (id),
  value INT
);

CREATE INDEX product on customer_review(product_id);
CREATE INDEX review on photo(review_id);
CREATE INDEX char_review on characteristic_reviews(review_id);
CREATE INDEX char_id on characteristic_reviews(characteristic_id);