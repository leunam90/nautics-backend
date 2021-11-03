const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'http://sql11.freemysqlhosting.net/',
    user: 'sql11448759',
    password: 'fbQQaArk6I',
    database: 'sql11448759'
});

mysqlConnection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('DB is connected');
    }
});


module.exports = mysqlConnection;