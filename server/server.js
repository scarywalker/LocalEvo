require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db");

const port = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants;");
    console.log(results);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: { restaurant: results.rows },
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants WHERE id = $1;", [
      req.params.id,
    ]);
    console.log(results);
    res.status(200).json({
      status: "success",
      data: { restaurant: results.rows[0] },
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1,$2,$3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);
    res.status(200).json({
      status: "success",
      data: { restaurant: results.rows[0] },
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    console.log(results);
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants WHERE id = $1;", [
      req.params.id,
    ]);
    console.log(results);
    res.status(204).json({
      status: "success",
      data: { restaurant: results.rows[0] },
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`server on : ${port}`));
