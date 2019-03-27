var resp = {};

resp.sendRows = function (req, res, rows, connection) {
    res.send(rows);
    connection.release();


}

resp.updateTable = function (req, res, data, connection) {
    connection.release();
    res.end();
}

module.exports = resp;