const pool = require("../db/dbConnection.js");
const resp = require("../utils/response.js");
// const sen = require("../utils/mail.js");
// var schedule = require('node-schedule');
var emailAlert = {};

pool
.connect()
.then(client => {
    return client
      .query('SELECT * FROM users')
      .then(res => {
        getData(res)
      })
      .then(() => client)

})
 .then(client => client.release())
.catch(e => console.error(e.message, e.stack));
// pool.end();
function getData(res){
    emailAlert.Operation = function(req, ress){
      resp.pushResp(req, ress, res.rows);
      // resp.sendToHTML();
      // resp.sendAlert(resp.sendToHTML);
    } 
    

}
module.exports = emailAlert;