# 🧪 VulnLab-2026

A deliberately vulnerable web application built for **educational and academic purposes**, designed to help students **practice identifying and exploiting real-world web vulnerabilities** in a controlled environment.

The project uses **Node.js, Express, MySQL, and vanilla HTML/CSS/JavaScript**, and is intended to be run **locally on Linux or Windows**.

---

## ⚠️ Disclaimer

> **This project is intentionally insecure.**
> It must **never** be deployed to a production environment or exposed to the public internet.

All vulnerabilities are included **for learning purposes only**.

---

## 🏗️ Tech Stack

* **Backend:** Node.js, Express
* **Database:** MySQL
* **Frontend:** HTML, CSS, Vanilla JavaScript
* **Auth:** JWT (intentionally weak configuration)
* **Server:** Apache / Node (local)
* **OS:** Linux / Windows (tested locally)

---

## 📁 Project Structure

```
VulnLab-2026/
├── Backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── jwt.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── users.js
│   │   │   ├── posts.js
│   │   │   └── upload.js
│   │   └── utils/
│   └── package.json
│
├── Frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── config.js
│   │   ├── auth.js
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── dashboard.js
│   │   ├── profile.js
│   │   └── upload.js
│   └── public/
│       ├── login.html
│       ├── register.html
│       ├── dashboard.html
│       ├── profile.html
│       └── upload.html
│
├── Database/
│   ├── schema.sql
│   └── seed.sql
│
├── uploads/
├── .env
├── .gitignore
└── README.md
```

---

## 🚀 How to Run the Project Locally

### ✅ Prerequisites

Make sure the following are installed:

* Node.js (v18+ recommended)
* MySQL Server
* Git
* Git Bash (recommended on Windows)

---

## 🔐 Environment Configuration (`.env`)

Create a file named `.env` in the **project root**:

```
VulnLab-2026/.env
```

### ✅ Example `.env`

```env
PORT=8000
NODE_ENV=development

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=vulnlab

JWT_SECRET=supersecret
JWT_EXPIRES_IN=7d
```

### Notes:

* `DB_PASS` can be empty if MySQL root has no password
* Do **not** wrap values in quotes
* Weak JWT secret is **intentional**

---

## 🗄️ Database Setup (Very Important)

### Step 1: Start MySQL

Make sure MySQL server is running.

---

### Step 2: Create schema

From **project root**, using **Git Bash**:

```bash
mysql -u root < Database/schema.sql
```

This will:

* Create `vulnlab` database
* Create `users`, `posts`, `uploads` tables

---

### Step 3: Seed database

```bash
mysql -u root < Database/seed.sql
```

This inserts:

* Default users
* Sample posts
* Initial test data

---

### Step 4: Verify (optional)

```bash
mysql -u root
```

```sql
USE vulnlab;
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM posts;
```

---

## 🧠 Default Test Credentials

```
Email: user1@vulnlab.com
Password: user123
```

Admin:

```
Email: admin@vulnlab.com
Password: admin123
```

---

## ⚙️ Backend Setup

### Step 1: Install dependencies

```bash
cd Backend
npm install
```

---

### Step 2: Start backend server

From **project root**:

```bash
node Backend/src/server.js
```

Expected output:

```
Connected to MySQL database
VulnLab backend running on port 8000
```

---

## 🌐 Frontend Usage

Frontend is **static HTML**.

Open the following file in browser:

```
Frontend/public/login.html
```

Then:

1. Login
2. Access dashboard
3. Create posts
4. View profiles
5. Upload files

---

## 🧪 Learning Objectives

* Understand how real web vulnerabilities occur
* Practice exploiting common OWASP Top 10 issues
* Learn why insecure defaults are dangerous
* Analyze backend + frontend interaction flaws

---

## 🛑 What This Project Is NOT

* ❌ Not production ready
* ❌ Not secure by design
* ❌ Not meant for public deployment

---

## 👨‍💻 Team Notes

* Backend, Frontend, Database, Deployment were handled separately
* Frontend was rebuilt cleanly to align with backend APIs
* Code readability and vulnerability clarity were prioritized

---

## 📌 Future Enhancements

* It still have bugs and behaves differently than expected , will solving all these things soon.
* Add more CVE-mapped vulnerabilities
* Add challenge descriptions per vulnerability
* Add attack walkthrough documentation
* Add reset scripts for lab reuse

---

## 📜 License

This project is for **educational use only**.

---