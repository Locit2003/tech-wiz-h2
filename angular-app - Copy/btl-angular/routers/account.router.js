const db = require("../connect");
const sestion = require('node-sessionstorage');

module.exports = function(server) {
    server.get('/account', function(req, res) {
        db.query("SELECT * FROM TAI_KHOAN", function(err, data) {
            let name = sestion.getItem('admin_login')
            res.render('account', {
                data: data,
                name_h: name
            });
        });
    });
    server.get('/account_create', function(req, res) {
        let name = sestion.getItem('admin_login')
        res.render('account_create', {
            name_h: name
        })
    });
    server.post('/account_create', function(req, res) {
        let fromData = req.body
        let sql = "INSERT INTO TAI_KHOAN SET ?"
        db.query(sql, [fromData], function(err, data) {
            if (!err) {
                res.redirect('/account')
            }
        });
    });
    server.get('/account_edit/:id', function(req, res) {
        let id = req.params.id
        let sql = "SELECT * FROM DANH_MUC WHERE id = ?"
        db.query(sql, [id], function(err, data) {
            let name = sestion.getItem('admin_login')
            let cat = null
            if (data.length > 0) {
                data = data[0]
            }
            res.render('account_edit', {
                data: cat,
                name_h: name
            })
        })
    });
    server.post('/account_edit/:id', function(req, res) {
        let fromData = req.body
        let id = req.params.id
        let sql = "UPDATE DANH_MUC SET ? WHERE id = ?"
        db.query(sql, [fromData, id], function(err, data) {
            if (!err) {
                res.redirect('/account')
            }
        })
    });
    server.get('/account_delete/:id', function(req, res) {
        let id = req.params.id
        let sql = "DELETE FROM TAI_KHOAN WHERE id = ?"
        db.query(sql, [id], function(err, data) {
            if (!err) {
                res.redirect('/account')
            }
        })
    });
}