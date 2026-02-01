const mysql = require("mysql2/promise");
require("dotenv").config();

async function init() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  console.log("Connected to MySQL server.");

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  console.log(`Database "${process.env.DB_NAME}" ensured.`);

  await connection.query(`USE \`${process.env.DB_NAME}\`;`);

  const schema = require("fs").readFileSync("./schema.sql", "utf8");
  const statements = schema
    .split(";")
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (let statement of statements) {
    await connection.query(statement);
  }

  console.log("Schema initialized successfully.");
  await connection.end();
}

const seedSQL = fs.readFileSync("./seed.sql", "utf8");

  const seedStatements = seedSQL
    .split(";")
    .map(s => s.trim())
    .filter(Boolean);

  for (const stmt of seedStatements) {
    await connection.query(stmt);
  }

  console.log("Seed data inserted.");

  await connection.end();
  console.log("Database fully initialized.");
}

init().catch(err => {
  console.error("Initialization failed:", err.message);
  process.exit(1);
});
