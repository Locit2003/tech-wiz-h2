const db = require("../connect");

module.exports = function(server) {
    server.post('/api/register', function(req, res) {
        let formData = req.body
        let sql = "INSERT INTO TAI_KHOAN SET ?"
        db.query(sql, [formData], function(err, data) {
            if (err) {
                res.send({ result: err.sqlMessage, status: false, })
            } else {
                formData.id = data.insertId
                res.send({
                    result: formData,
                    status: true,
                })
            }
        })
    });
    server.post('/api/login', function(req, res) {
        let formData = req.body
        let sql = "SELECT * FROM TAI_KHOAN WHERE email = ? AND password = ?"
        db.query(sql, [req.body.email, req.body.password], function(err, data) {
            formData.id = data.insertId
            res.send({
                result: data.length ? data[0] : null
            });
        });
    });
}