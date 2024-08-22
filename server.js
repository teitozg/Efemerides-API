const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Client } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new Client({
  user: "root",
  host: "dpg-cr3oo4btq21c73ec4jfg-a.oregon-postgres.render.com",
  database: "efemerides",
  password: "TDbVZnmA9iSoIGGwPDf04vb5Wuuj3S7p",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // This is required to avoid issues with self-signed certificates
  },
});

db.connect();

app.get("/posts", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT * FROM posts
      WHERE date_of_publishing <= NOW()::DATE
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
