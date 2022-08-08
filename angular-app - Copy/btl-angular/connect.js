const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'show_clothes'
});

db.connect(function(err) {
    if (err) {
        throw new Error('Không thể kết nối CSDL show_Clothes');
    }
});

module.exports = db;