const { Pool } = require("pg");

const devConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

module.exports = { query: (text, params) => pool.query(text, params) };
