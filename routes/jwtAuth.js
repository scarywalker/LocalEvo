const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// registering route

router.post("/register", validInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(`request register name : ${name}`);
    const user = await db.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    console.log(`done db check`);
    if (user.rows.length !== 0)
      return res.status(401).send("User already exists");

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(" done salting");
    const bcryptPassword = await bcrypt.hash(password, salt);
    console.log("done encryption");
    const newUser = await db.query(
      "INSERT INTO users (user_name, user_email, user_password) values ($1, $2, $3) RETURNING *;",
      [name, email, bcryptPassword]
    );
    console.log("done db op");
    const token = jwtGenerator(newUser.rows[0].user_id);
    console.log("token created");
    res.status(201).json({
      status: "success",
      data: {
        token,
        user_id: newUser.rows[0].user_id,
        user_name: newUser.rows[0].user_name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Server Error${error}`);
  }
});

// login route

router.post("/login", validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0)
      return res.status(401).json("Password or Email is incorrect");

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword)
      return res.status(401).json("Password or Email is incorrect");

    const token = jwtGenerator(user.rows[0].user_id);

    res.status(201).json({
      status: "success",
      data: {
        token,
        user_id: user.rows[0].user_id,
        user_name: user.rows[0].user_name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Server Error${error}`);
  }
});

// verification

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Server Error${error}`);
  }
});

module.exports = router;