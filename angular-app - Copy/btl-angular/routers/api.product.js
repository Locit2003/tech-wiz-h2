const db = require("../connect")

module.exports = function(server) {
    server.get('/api/product', function(req, res) {
        db.query("SELECT * FROM SAN_PHAM", function(err, data) {
            res.send({
                result: data
            })
        })
    });
    server.delete('/api/product/:id', function(req, res) {
        let id = req.params.id;
        let sql = "DELETE FROM SAN_PHAM WHERE id = ?";
        db.query(sql, [id], function(err, data) {
            res.send({
                result: data
            })
        })
    });
    server.post('/api/product', function(req, res) {
        let fromData = req.body;
        let sql = "INSERT INTO SAN_PHAM SET ?";
        db.query(sql, [fromData], function(err, data) {
            fromData.id = data.insertId
            res.send({
                result: fromData
            })
        })
    });
    server.get('/api/product/:id', function(req, res) {
        let id = req.params.id;
        let sql = "SELECT * FROM SAN_PHAM WHERE id = ?";
        db.query(sql, [id], function(err, data) {
            res.send({
                result: data.length ? data[0] : null
            })
        })
    });
    server.put('/api/product/:id', function(req, res) {
        let fromData = req.body;
        let id = req.params.id;
        let sql = "UPDATE SAN_PHAM SET ? WHERE id = ?";
        db.query(sql, [fromData, id], function(err, data) {
            fromData.id = id
            res.send({
                result: fromData,
                message: 'Cập nhật thành công'
            })
        })
    });
    server.get('/api/category-list-product/:id', function(req, res) {
        let id = req.params.id;
        console.log(id)
        let sql = 'SELECT * FROM SAN_PHAM WHERE category_id = ?';
        db.query(sql, [id], function(err, data) {
            res.send({
                result: data,
            })
        })
    })
}