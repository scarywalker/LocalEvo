require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const port = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/v1/restaurants", (req, res) => {
  res.status(200).json({
    status: "success",
    data: { restaurant: ["mcdonalds", "wendys"] },
  });
});

app.get("/api/v1/restaurants", (req, res) => {
  res.status(200).json({
    status: "success",
    data: { restaurant: ["mcdonalds", "wendys"] },
  });
});

app.post("/api/v1/restaurants", (req, res) => {
});

app.put("/api/v1/restaurants/:id", (req, res) => {
});

app.delete("/api/v1/restaurants/:id", (req, res) => {
});

app.listen(port, () => console.log(`server on : ${port}`));
