const db = require("../connect");
const sestion = require('node-sessionstorage');

module.exports = function (server) {
    server.get('/category', function (req, res) {
        db.query("SELECT * FROM DANH_MUC", function (err, data) {
            let message = null
            let name = sestion.getItem('admin_login')
            if (err) {
                message = err.sqlMessage
            } else {
                res.render('category', {
                    data: data,
                    name_h: name
                })
            }
        })
    });
    server.post('/category', function (req, res) {
        let formname = req.body.name
        let SQL = "SELECT * FROM DANH_MUC WHERE name like ?"
        db.query(SQL, [formname], function (err, data) {
            let name = sestion.getItem('admin_login')
            if (formname == 0) {
                res.redirect('/category')
            } else {
                res.render('category', {
                    data: data,
                    name_h: name
                })
            }
        })
    });
    server.get('/category_delete/:id', function (req, res) {
        let id = req.params.id
        let sql = "DELETE FROM DANH_MUC WHERE id = ?"
        db.query(sql, [id], function (err, data) {
            let name = sestion.getItem('admin_login')
            let message = null
            if (err) {
                message = 'danh mục này đang có sản phẩm, nên không xoá được'
                res.render('category_error', { message }, {
                    name_h: name
                })
            } else {
                res.redirect('/category')
            }
        })
    });
    server.get('/category_create', function (req, res) {
        let name = sestion.getItem('admin_login')
        res.render('category_create', {
            name_h: name
        })
    });
    server.post('/category_create', function (req, res) {
        let fromData = req.body
        let sql = "INSERT INTO DANH_MUC SET ?"
        db.query(sql, [fromData], function (err, data) {
            if (!err) {
                res.redirect('/category')
            }
        })
    });
    server.get('/category_edit/:id', function (req, res) {
        let id = req.params.id
        let sql = "SELECT * FROM DANH_MUC WHERE id = ?"
        db.query(sql, [id], function (err, data) {
            let name = sestion.getItem('admin_login')
            res.render('category_edit', {
                data: data.length ? data[0] : null,
                name_h: name
            })
        })
    });
    server.post('/category_edit/:id', function (req, res) {
        let fromData = req.body
        let id = req.params.id
        let sql = "UPDATE DANH_MUC SET ? WHERE id = ?"
        db.query(sql, [fromData, id], function (err, data) {
            if (!err) {
                res.redirect('/category')
            }
        })
    });
}
