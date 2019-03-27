const Pool = require("pg-pool");
const url = require('url');
const db = require("./db_ Credential.js").db;
var urll = "postgres://" + db.user + ":" + db.pass + "@" + db.host + ":" + db.port + "/" + db.schema;
const params = url.parse(urll);
const auth = params.auth.split(':');
var conn = {};

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};

const pool = new Pool(config);

conn.getCon = function (callback) {
  pool
    .connect()
    .then(client => {
      callback(client)
    })
    .catch(e => {
      console.log(e.message)
      callback(e)
    }
    )
}

module.exports = conn;

