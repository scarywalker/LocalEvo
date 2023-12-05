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
      "INSERT INTO restaurants (name, location, price_range) values ($1,$2,$3)",
      [req.params.id, req.params.id, req.params.id]
    );
  } catch (error) {
    console.log(error);
  }
});

// app.put("/api/v1/restaurants/:id", (req, res) => {});

// app.delete("/api/v1/restaurants/:id", (req, res) => {});

app.listen(port, () => console.log(`server on : ${port}`));
