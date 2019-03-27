const conn = require("../db/db_Connection.js");
const resp = require("../utils/response.js");

var dt = {
    ///////////////////////////////////////////////////////////////
    getRecords: function (req, res) {
        conn.getCon(function (connection) {
            connection
                .query('SELECT * FROM users')
                .then(rows => {
                    resp.sendRows(req, res, rows.rows, connection)
                })
                .catch(e => console.log(e.massage, e.stack));

        });
    },
    ////////////////////////////////////////////////////////////////
    addRecord: function (req, res) {
        conn.getCon(function (connection) {
            connection
                .query("insert into users (id,name,email,address,mobile) " +
                    "values ('" + req.body.id + "','" + req.body.name + "','" +
                    req.body.email + "','" + req.body.address + "','" + req.body.mobile + "')" +
                    "RETURNING *")
                .then(rows => {
                    resp.updateTable(req, res, rows.rows, connection)
                })
                .catch(e => console.log(e.massage, e.stack));
        });
    },
    //////////////////////////////////////////////////////////////////
    delRecord: function (req, res) {
        conn.getCon(function (connection) {
            connection
                .query("delete from users where id = '" + req.body.id + "'" +
                    "RETURNING *")
                .then(rows => {
                    resp.updateTable(req, res, rows.rows, connection)
                })
                .catch(e => console.log(e.massage, e.stack));
        });
    },
    ///////////////////////////////////////////////////////////////////
    updateRecord: function (req, res) {
        conn.getCon(function (connection) {
            connection
                .query("UPDATE users  " +
                    "SET (id,name,email,address,mobile) = ROW ('" + req.body.id + "','" + req.body.name + "','" +
                    req.body.email + "','" + req.body.address + "','" + req.body.mobile + "')" +
                    "WHERE id = '" + req.body.id + "'" +
                    "RETURNING *")
                .then(rows => {
                    resp.updateTable(req, res, rows.rows, connection)
                })
                .catch(e => console.log(e.massage, e.stack));
        });

    }
    /////////////////////////////////////////////////////////////////////////
}
module.exports = dt;