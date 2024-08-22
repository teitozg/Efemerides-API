const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Client } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "notes",
  password: "Atenas9democraci.",
  port: 5432,
});
db.connect();

app.get("/posts", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT * FROM posts
      WHERE date_of_publishing <= NOW()
      ORDER BY date_of_publishing DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
