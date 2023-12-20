const router = require("express").Router();
const db = require("../db");

// get reviews by user

router.get("/:id", async (req, res) => {
  try {
    const reviews = await db.query(
      "SELECT * FROM reviews WHERE user_id = $1;",
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: { reviews: reviews.rows },
    });
  } catch (error) {
    console.log(error);
  }
});

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

// update review

router.put("/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET restaurant_name = $1, location = $2, cosine_type = $3,price_range = $4 where restaurant_id = $5 returning *",
      [
        req.body.name,
        req.body.location,
        req.body.type,
        req.body.price_range,
        req.params.id,
      ]
    );
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

// delete review

router.delete("/:id", async (req, res) => {
  try {
    const results = await db.query(
      "DELETE FROM restaurants WHERE restaurant_id = $1;",
      [req.params.id]
    );
    res.status(204).json({
      status: "success",
      data: { restaurant: results.rows[0] },
    });
  } catch (error) {
    console.log(error);
  }
});
