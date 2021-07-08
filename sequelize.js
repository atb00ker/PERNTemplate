require('dotenv').config(); // this is important!

module.exports = {
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "host": process.env.DB_HOST,
  "port": "5432",
  "dialect": "postgresql"
}
