const router = require("express").Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const results = await db.query(
      "SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
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

router.get("/:id", async (req, res) => {
  try {
    const restaurant = await db.query(
      "SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1;",
      [req.params.id]
    );
    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1;",
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

router.post("/", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1,$2,$3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: "success",
      data: { restaurant: results.rows[0] },
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants WHERE id = $1;", [
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

router.post("/:id/add-review", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1,$2,$3,$4) returning *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
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
