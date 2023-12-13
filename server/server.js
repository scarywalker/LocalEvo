require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");

const port = process.env.PORT || 3002;

// middlewere

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes

app.use("/api/v1/auth", require("./routes/jwtAuth"));

app.use("/api/v1/dashboard", require("./routes/dashboard"));

app.use("/api/v1/restaurants", require("./routes/restaurants"));

app.listen(port, () => console.log(`server on : ${port}`));
