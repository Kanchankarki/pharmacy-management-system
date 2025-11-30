const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'KANCHANkarki@123',
    database: 'pharmacy_db'
});

db.getConnection()
    .then(() => {
        console.log('Connected to MySQL!');
    })
    .catch((err) => {
        console.error('Error connecting to MySQL:', err);
    });

module.exports = db;
