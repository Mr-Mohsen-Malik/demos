const conn = require("../db/db_Connection.js");
const resp = require("../utils/response.js");

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');


/////////////////////////////////////////////////////////////////////////////

router.post('/register', function(req, res) {
  
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }); 
  });
////////////////////////////////////////////////////////////////////////////////////////
var dt = {
    ///////////////////////////////////////////////////////////////
    getRecords: function (req, res) {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);

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
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        conn.getCon(function (connection) {
            connection
                .query("insert into singup (id,name,email,password) " +
                    "values ('" + req.body.id + "','" + req.body.name + "','" +
                    req.body.email + "','" + hashedPassword +  "')")
                .then(rows => {
                    var token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
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