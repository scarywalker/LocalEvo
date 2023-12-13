const router = require("express").Router();
const db = require("../db");

// get all restaurants with avarage rating and view count

router.get("/", async (req, res) => {
  try {
    const results = await db.query(
      "SELECT restaurants.*, COALESCE(reviews.review_count, 0) AS review_count, COALESCE(reviews.average_rating, 0) AS average_rating FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) AS review_count, TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.restaurant_id = reviews.restaurant_id;"
    );
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: { restaurant: results.rows },
    });
  } catch (error) {
    console.log(error);
  }
});

// get all restaurants of user with avarage rating and view count

router.get("/user/:id", async (req, res) => {
  try {
    const results = await db.query(
      "SELECT restaurants.*, COALESCE(reviews.review_count, 0) AS review_count, COALESCE(reviews.average_rating, 0) AS average_rating FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) AS review_count, TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.restaurant_id = reviews.restaurant_id WHERE restaurants.user_id = $1;",[req.params.id]
    );
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: { restaurant: results.rows },
    });
  } catch (error) {
    console.log(error);
  }
});

// get a restaurant with avarage rating, view count and all reviews for it

router.get("/:id", async (req, res) => {
  try {
    const restaurant = await db.query(
      "SELECT restaurants.*, COALESCE(reviews.review_count, 0) AS review_count, COALESCE(reviews.average_rating, 0) AS average_rating FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) AS review_count, TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.restaurant_id = reviews.restaurant_id WHERE restaurants.restaurant_id = $1;",
      [req.params.id]
    );
    const reviews = await db.query(
      "SELECT reviews.*, users.user_name FROM reviews INNER JOIN users ON reviews.user_id = users.user_id WHERE reviews.restaurant_id = $1;",
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: { restaurant: restaurant.rows[0], reviews: reviews.rows },
    });
  } catch (error) {
    console.log(error);
  }
});

// add a new restaurant to the database.

router.post("/", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (user_id, restaurant_name, location, cosine_type, price_range) VALUES ($1,$2,$3,$4,$5) returning *",
      [
        req.body.id,
        req.body.name,
        req.body.location,
        req.body.type,
        req.body.price_range,
      ]
    );
    res.status(201).json({
      status: "success",
      data: { restaurant: results.rows[0] },
    });
  } catch (error) {
    console.log(error);
  }
});

// update restaurant in db

router.put("/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET restaurant_name = $1, location = $2, cosine_type = $3,price_range = $4 where restaurant_id = $5 returning *",
      [req.body.name, req.body.location,req.body.type, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

// delete restaurant

router.delete("/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants WHERE restaurant_id = $1;", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
      data: { restaurant: results.rows[0] },
    });
  } catch (error) {
    console.log(error);
  }
});

// routes bellow are for reviews

// add review

router.post("/:id/add-review", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, user_id, review_text, rating) values ($1,$2,$3,$4) returning *",
      [req.params.id, req.body.userId, req.body.review, req.body.rating]
    );
    res.status(201).json({
      status: "success",
      data: { review: newReview.rows[0] },
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
