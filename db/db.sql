DROP TABLE restaurants;

SELECT * FROM restaurants;
SELECT * FROM reviews;
SELECT * FROM users;

create extension if not exists "uuid-ossp";

CREATE TABLE users (
user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
user_name VARCHAR(255) NOT NULL,
user_email VARCHAR(255) NOT NULL,
user_password VARCHAR(255) NOT NULL);

CREATE TABLE restaurants (
    restaurant_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES users(user_id) NOT NULL,
    restaurant_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    cosine_type VARCHAR(255) NOT NULL,
    price_range INTEGER CHECK (price_range BETWEEN 1 AND 5) NOT NULL
);

CREATE TABLE reviews (
    review_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES users(user_id) NOT NULL,
    restaurant_id uuid REFERENCES restaurants(restaurant_id) NOT NULL,
    review_text TEXT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL
);





SELECT restaurants.*, COALESCE(reviews.review_count, 0) AS review_count, COALESCE(reviews.average_rating, 0) AS average_rating FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) AS review_count, TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.restaurant_id = reviews.restaurant_id;

SELECT reviews.*, users.user_name FROM reviews INNER JOIN users ON reviews.user_id = users.user_id WHERE reviews.restaurant_id = $1;
