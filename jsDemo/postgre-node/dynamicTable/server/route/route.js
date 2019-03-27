var express = require('express');
var routes = express.Router();

var dt = require(process.cwd() + "/server/modules/dynamicTable.js");

routes.get('/', function (req, res) {
    res.sendfile('/index.html');
});
routes.get('/readRecords', function (req, res) {
    dt.getRecords(req, res);
});
routes.post('/addRecord', function (req, res) {
    dt.addRecord(req, res);
});
routes.post('/updateRecord', function (req, res) {
    dt.updateRecord(req, res);
    
});
routes.post('/delRecord', function (req, res) {
    dt.delRecord(req, res);
});

module.exports = routes;