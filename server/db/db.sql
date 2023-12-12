-- DROP TABLE restaurants;

-- CREATE TABLE restaurants (
-- id BIGSERIAL NOT NULL PRIMARY KEY,
-- name VARCHAR(50) NOT NULL,
-- location VARCHAR(50) NOT NULL,
-- price_range int NOT NULL check(price_range >= 1 and price_range <= 5));

-- SELECT * FROM restaurants;

-- CREATE TABLE reviews (
-- id BIGSERIAL NOT NULL PRIMARY KEY,
-- restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
-- name VARCHAR(50) NOT NULL,
-- review TEXT NOT NULL,
-- rating INT NOT NULL check(rating >= 1 and rating <= 5));

-- INSERT INTO reviews (restaurant_id, name, review, rating) values (5, 'btqr', 'dee3er', 3);

-- SELECT * FROM reviews;

SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = 4;