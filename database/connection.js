require('dotenv').config();

const mysql = require('mysql');


const db = mysql.createConnection({
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    host: process.env.DB_HOST
});

db.connect();


module.exports = db;
