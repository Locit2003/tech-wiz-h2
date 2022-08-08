const db = require("../connect")

module.exports = function(server) {
    server.get('/api/favourite', function(req, res) {
        db.query("SELECT * FROM YEU_THICH", function(err, data) {
            res.send({
                result: data
            })
        })
    });
    server.delete('/api/favourite/:id', function(req, res) {
        let id = req.params.id;
        let sql = "DELETE FROM YEU_THICH WHERE id = ?";
        db.query(sql, [id], function(err, data) {
            res.send({
                result: data
            })
        })
    });
    server.post('/api/favourite', function(req, res) {
        let fromData = req.body;
        let sql = "INSERT INTO YEU_THICH SET ?";
        db.query(sql, [fromData], function(err, data) {
            fromData.id = data.insertId
            res.send({
                result: fromData
            })
        })
    });
}