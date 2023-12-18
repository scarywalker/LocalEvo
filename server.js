require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const morgan = require("morgan");
const db = require("./db");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3002;

// middlewere

app.use(cors());
app.use(express.json());
// app.use(morgan("dev"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/local-evo/build")));
}

// routes

app.use("/api/v1/auth", require("./routes/jwtAuth"));

app.use("/api/v1/dashboard", require("./routes/dashboard"));

app.use("/api/v1/restaurants", require("./routes/restaurants"));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/local-evo/build/index.html"));
// });

app.listen(PORT, () => console.log(`server on : ${PORT}`));
