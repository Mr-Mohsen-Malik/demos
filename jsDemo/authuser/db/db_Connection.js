import Pool       from "pg-pool";
import url        from 'url';
import Credential from './db_ Credential.js';

let db       = Credential.db;
let urll     = "postgres://" + db.user + ":" + db.pass + "@" + db.host + ":" + db.port + "/" + db.schema;
const params = url.parse(urll);
const auth   = params.auth.split(':');
let conn     = {};

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};

const pool = new Pool(config);

conn.getCon =  (callback) => {
  pool
    .connect()
    .then(client => {
      callback(client)
      return client;
    })
    .catch(e => {
      logger.error({message :e.massage})
      callback(e)
    }
    )
}

module.exports = conn;

