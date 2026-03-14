const mysql = require('mysql2/promise');
require("dotenv").config()

const db = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

db.getConnection()
    .then(conn => {
        console.log("Connected to database successfully!");
        conn.release();
    })
    .catch(err => {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    });

module.exports = db