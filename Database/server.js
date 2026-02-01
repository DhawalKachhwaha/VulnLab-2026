const express = require("express");
const db = require("./db");
const multer = require("multer");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* FILE UPLOAD SETUP (NO VALIDATION) */
const upload = multer({ dest: "uploads/" });

/* REGISTER */
app.post("/api/register", (req, res) => {
  const { username, email, password, bio } = req.body;

  const sql =
    "INSERT INTO users (username, email, password, bio) VALUES (?, ?, ?, ?)";

  db.query(sql, [username, email, password, bio], (err, result) => {
    if (err) return res.send(err);
    res.send("User registered with ID: " + result.insertId);
  });
});

/* LOGIN (PLAINTEXT PASSWORD CHECK) */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, results) => {
    if (err) return res.send(err);
    if (results.length === 0) {
      return res.send("Invalid credentials");
    }
    res.send(results[0]);
  });
});

/* PROFILE */
app.get("/api/profile/:id", (req, res) => {
  const sql = "SELECT * FROM users WHERE id = " + req.params.id;
  db.query(sql, (err, results) => {
    if (err) return res.send(err);
    res.send(results[0]);
  });
});

/* POSTS / COMMENTS */
app.post("/api/posts", (req, res) => {
  const { user_id, title, content } = req.body;

  const sql =
    "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)";

  db.query(sql, [user_id, title, content], (err, result) => {
    if (err) return res.send(err);
    res.send("Post created");
  });
});

app.get("/api/posts", (req, res) => {
  db.query("SELECT * FROM posts", (err, results) => {
    if (err) return res.send(err);
    res.send(results);
  });
});

/* FILE UPLOAD */
app.post("/api/upload", upload.single("file"), (req, res) => {
  const { user_id } = req.body;

  const sql =
    "INSERT INTO uploads (user_id, filename, filepath) VALUES (?, ?, ?)";

  db.query(
    sql,
    [user_id, req.file.originalname, req.file.path],
    err => {
      if (err) return res.send(err);
      res.send("File uploaded");
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
