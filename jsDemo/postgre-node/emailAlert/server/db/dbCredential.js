const connString = require( "./dbCredential.json" );

let db_cred = {
    db : {
        port : process.env.DB_PORT || connString.port,
        host : process.env.DB_HOST || connString.host,
        user : process.env.DB_USER || connString.user,
        pass : process.env.DB_PASS || connString.password,
        schema : process.env.DB_SCHEMA || connString.database,
    }
    }
    
    
    module.exports = db_cred;


// const connString = require( "./dbCredential.json" );


// const pg= require('pg');

// const pool= new pg.Pool({
//     user: connString.user,
//     host: connString.host,
//     database: connString.database,
//     password: connString.password,
//     port: connString.port
// });

// module.exports = pool;