var express=require('express');
var routes = express.Router();

var emailAlert = require(process.cwd()+ "/server/modules/emailAlert.js");

routes.get('/email_alert', function (req, res) {
    emailAlert.Operation(req, res);
 });

//  routes.get('/index', function (req, res) {
//     emailAlert.Operation(req, res);
//  });
 
//  routes.get('/id', function (req, res) {
//     emailAlert.Operation2(req, res);
//  });
 module.exports = routes;