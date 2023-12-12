DROP TABLE restaurants;

SELECT * FROM restaurants;
SELECT * FROM reviews;
SELECT * FROM users;

INSERT INTO reviews (restaurant_id, name, review, rating) values (5, 'btqr', 'dee3er', 3);
INSERT INTO users (user_name, user_email, user_password) values ( 'Henry', 'henry@email.com', 'passwordhenry');

CREATE TABLE restaurants (
id BIGSERIAL NOT NULL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
location VARCHAR(50) NOT NULL,
price_range int NOT NULL check(price_range >= 1 and price_range <= 5));

CREATE TABLE reviews (
id BIGSERIAL NOT NULL PRIMARY KEY,
restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
name VARCHAR(50) NOT NULL,
review TEXT NOT NULL,
rating INT NOT NULL check(rating >= 1 and rating <= 5));


SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = 4;

create extension if not exists "uuid-ossp";

CREATE TABLE users (
user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
user_name VARCHAR(255) NOT NULL,
user_email VARCHAR(255) NOT NULL,
user_password VARCHAR(255) NOT NULL);

