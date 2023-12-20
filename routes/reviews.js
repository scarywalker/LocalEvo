const router = require("express").Router();
const db = require("../db");

// get reviews by user

router.get("/:id", async (req, res) => {
  try {
    const reviews = await db.query(
      "SELECT reviews.*, restaurants.restaurant_name FROM reviews JOIN restaurants ON reviews.restaurant_id = restaurants.restaurant_id WHERE reviews.user_id = $1;",
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

// get review by review id

router.get("/update/:id", async (req, res) => {
  try {
    const reviews = await db.query(
      "SELECT * FROM reviews WHERE review_id = $1;",
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
      "INSERT INTO reviews (restaurant_id, user_id, review_text, rating) values ($1,$2,$3,$4) returning *;",
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
    await db.query(
      "UPDATE reviews SET review_text = $1, rating = $2 WHERE review_id = $3;",
      [req.body.text, req.body.rating, req.params.id]
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
    await db.query("DELETE FROM reviews WHERE review_id = $1;", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
