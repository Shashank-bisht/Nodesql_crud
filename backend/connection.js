const mysql = require('mysql2');

// Create a connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'curd1'
});

// Attempt to connect
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to database');
    }
});

// Export the connection for use in other modules
module.exports = db;
