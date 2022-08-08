const db = require("../connect");
const sestion = require('node-sessionstorage');

module.exports = function (server) {
    server.get('/', function (req, res) {
        let name = sestion.getItem('admin_login')
        res.render('home', {
            name_h: name
        })
    });
    server.get('/about', function (req, res) {
        let name = sestion.getItem('admin_login')
        res.render('about', {
            name_h: name
        })
    });
    server.get('/login', function (req, res) {
        res.render('log/login', { message: null })
    });
    server.post('/login', function (req, res) {
        let sql = "SELECT * FROM TAI_KHOAN WHERE email = ? AND password = ?"
        db.query(sql, [req.body.email, req.body.password], function (err, data) {
            let message = null
            if (!err && data.length > 0) {
                sestion.setItem('admin_login', data[0].name)
                res.redirect('/')
            } else {
                message = 'Thông tin tài khoản không chính xác'
                res.render('log/login_error', { message })
            }
        })
    });
    server.get('/logout', function (req, res) {
        sestion.removeItem('admin_login')
        res.redirect('/login')
    });
    server.get('/register', function (req, res) {
        res.render('log/register')
    });
    server.post('/register', function (req, res) {
        let formData = req.body
        let sql = "INSERT INTO TAI_KHOAN SET ?"
        db.query(sql, [formData], function (err, data) {
            let message = null
            if (err) {
                message = err.sqlMessage;
                res.render('log/register_error', {
                    message: message
                })
            } else {
                res.render('log/login')
            }
        })
    });
}