const connString = require("./db_Credential.json");

var db_cred = {
    db : {
        port : process.env.DB_PORT || connString.port,
        host : process.env.DB_HOST || connString.host,
        user : process.env.DB_USER || connString.user,
        pass : process.env.DB_PASS || connString.password,
        schema : process.env.DB_SCHEMA || connString.database,
    }
}
module.exports = db_cred;