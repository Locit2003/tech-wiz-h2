const db = require("../connect")

module.exports = function (server) {
    server.get('/api/category', function (req, res) {
        db.query("SELECT * FROM DANH_MUC", function (err, data) {
            res.send({
                result: data
            })
        })
    });
    server.delete('/api/category/:id', function (req, res) {
        let id = req.params.id;
        let sql = "DELETE FROM DANH_MUC WHERE id = ?";
        db.query(sql, [id], function (err, data) {
            res.send({
                result: data
            })
        })
    });
    server.post('/api/category', function (req, res) {
        let fromData = req.body;
        let sql = "INSERT INTO DANH_MUC SET ?";
        db.query(sql, [fromData], function (err, data) {
            fromData.id = data.insertId
            res.send({
                result: fromData
            })
        })
    });
    server.get('/api/category/:id', function (req, res) {
        let id = req.params.id;
        let sql = "SELECT * FROM DANH_MUC WHERE id = ?";
        db.query(sql, [id], function (err, data) {
            res.send({
                result: data.length ? data[0] : null
            })
        })
    });
    server.put('/api/category/:id', function (req, res) {
        let fromData = req.body;
        let id = req.params.id;
        let sql = "UPDATE DANH_MUC SET ? WHERE id = ?";
        db.query(sql, [fromData, id], function (err, data) {
            fromData.id = id
            res.send({
                result: fromData,
                message: 'Cập nhật thành công'
            })
        })
    });
}