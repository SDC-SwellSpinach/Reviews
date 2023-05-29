\COPY customer_review FROM '/Users/b.h./Desktop/seniorPhase/reviews/Data/reviews.csv' DELIMITER ',' CSV HEADER;

SELECT setval('customer_review_id_seq', (select max(id) from customer_review ));

\COPY photo FROM '/Users/b.h./Desktop/seniorPhase/reviews/Data/reviews_photos.csv' DELIMITER ',' CSV HEADER;

SELECT setval('photo_id_seq', (select max(id) from photo ));

\COPY characteristics FROM '/Users/b.h./Desktop/seniorPhase/reviews/Data/characteristics.csv' DELIMITER ',' CSV HEADER;

SELECT setval('characteristics_id_seq', (select max(id) from characteristics ));

\COPY characteristic_reviews FROM '/Users/b.h./Desktop/seniorPhase/reviews/Data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

SELECT setval('characteristic_reviews_id_seq', (select max(id) from characteristic_reviews ));

