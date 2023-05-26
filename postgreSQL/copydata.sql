\COPY customer_review FROM '/Users/b.h./Desktop/seniorPhase/reviews/Data/reviews.csv' DELIMITER ',' CSV HEADER;

\COPY photo FROM '/Users/b.h./Desktop/seniorPhase/reviews/Data/reviews_photos.csv' DELIMITER ',' CSV HEADER;

\COPY characteristics FROM '/Users/b.h./Desktop/seniorPhase/reviews/Data/characteristics.csv' DELIMITER ',' CSV HEADER;

\COPY characteristic_reviews FROM '/Users/b.h./Desktop/seniorPhase/reviews/Data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

