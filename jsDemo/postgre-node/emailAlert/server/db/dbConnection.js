const Pool = require('pg-pool');
const url = require('url');
const db = require('./dbCredential.js').db;
var urll ="postgres://"+db.user+":"+db.pass+"@"+db.host+":"+db.port+"/"+db.schema;
const params = url.parse(urll);
const auth = params.auth.split(':');
 
const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};

const pool = new Pool(config);

  module.exports = pool;
 





// const genericPool = require("generic-pool");
// const connString = require( "./dbCredential.json" );
// const DbDriver = require("pg");
// require('pg-parse-float')(DbDriver);

// const pgConString  = "postgres://postgres:system@localhost:5432/wittybrains";
// var dbConnection = new Object();

// const myPool = new genericPool.Pool({
//     name: 'postgres',
//     min : 2,
//     max: 10,
//     create: function(callback) {
//         var c = new DbDriver.Client(pgConString);
//         c.connect(function(err,client){
//             client.query("Set search_path = public",function(err,result) {
//                 if(err){
//                     console.log(err.message);
//                 }
//                 callback(err,client);
//             })

//         })
//     },
//     destroy: function(client) {
//             client.end();
//     }

// });

// dbConnection.createConnection = function(callback){
//     myPool.acquire(function(err, connection){
//     //     connection.query("SELECT * FROM users", [], function(err,res) {
//     //                console.log(err,res);
//     // });
//     callback(err, connection);
// });
// };

// dbConnection.closeConnection = function(connection){
//     if(connection !== null){
//         myPool.release(connection);
//     }
// };

// dbConnection.end = function(){

//     if(pool !== null)
//         pool.drain(function() {
//             pool.destroyAllNow();
//         });

// };

// module.exports = dbConnection;
 
// // const resourcePromise = myPool.acquire();
 
// // resourcePromise
// //   .then(function(client) {
// //     client.query("SELECT * FROM users", [], function(err,res) {
// //       console.log(err,res);
// //       myPool.release(client);
// //     });
// //   })
// //   .catch(function(err) {
// //     console.log("Error in acquiring connection");
// //   });
 

// // myPool.drain().then(function() {
// //   myPool.destroyAllNow();
// // });