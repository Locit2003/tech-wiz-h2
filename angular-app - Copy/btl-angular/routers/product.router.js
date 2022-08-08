const db = require("../connect");
const sestion = require('node-sessionstorage');
const upload = require('../moddleware/upload')

module.exports = function(server) {
    server.get('/product', function(req, res) {
        db.query("SELECT * FROM SAN_PHAM", function(err, data) {
            let name = sestion.getItem('admin_login')
            res.render('product', {
                data: data,
                name_h: name
            })
        })
    });
    server.post('/product', function(req, res) {
        let formname = req.body.name
        let SQL = "SELECT * FROM SAN_PHAM WHERE name like ?"
        db.query(SQL, [formname], function(err, data) {
            let name = sestion.getItem('admin_login')
            if (formname == 0) {
                res.redirect('/product')
            } else {
                res.render('product', {
                    data: data,
                    name_h: name
                })
            }
        })
    });
    server.get('/product_delete/:id', function(req, res) {
        let id = req.params.id
        let sql = "DELETE FROM SAN_PHAM WHERE id = ?"
        db.query(sql, [id], function(err, data) {
            if (!err) {
                res.redirect('/product')
            }
        })
    });
    server.get('/product_create', function(req, res) {
        db.query("SELECT * FROM DANH_MUC", function(err, data) {
            let name = sestion.getItem('admin_login')
            res.render('product_create', {
                data: data,
                name_h: name
            })
        })

    });
    server.post('/product_create', upload, function(req, res) {
        let fromData = req.body;
        if (req.file) {
            fromData.image = req.file.filename;
        }
        let sql = "INSERT INTO SAN_PHAM SET ?";
        db.query(sql, [fromData], function(err, data) {
            console.log(data)
            if (err) {
                console.log(err);
            } else {
                res.redirect('/product')
            }
        })
    });
    server.get('/product_edit/:id', function(req, res) {
        let id = req.params.id;
        let sql = "SELECT * FROM SAN_PHAM WHERE id = ?";
        db.query(sql, [id], function(err, data) {
            let name = sestion.getItem('admin_login')
            res.render('product_edit', {
                data: data.length ? data[0] : null,
                name_h: name
            })
        })
    });
    server.post('/product_edit/:id', function(req, res) {
        let fromData = req.body
        let id = req.params.id
        let sql = "UPDATE SAN_PHAM SET ? WHERE id = ?"
        db.query(sql, [fromData, id], function(err, data) {
            if (!err) {
                res.redirect('/product')
            }
        })
    });
}