const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/jobtracker.db", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company TEXT NOT NULL,
        role TEXT NOT NULL,
        location TEXT,
        application_date TEXT,
        status TEXT NOT NULL,
        job_link TEXT,
        notes TEXT
    )
`);

module.exports = db;