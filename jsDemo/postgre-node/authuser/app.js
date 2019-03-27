var express = require('express');
var bodyParser = require('body-parser');
var routes = require(process.cwd() + '/server/route/route.js');
const port = process.env.PORT || 4000;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('client'));

app.use('/', routes);

app.listen(port, () => {
    console.log('Node server listening on ', port);
});

module.exports = routes;

/*
var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();
var dbOperations = require("./dbOperations.js");
var logFmt = require("logfmt");
app.set('views', __dirname + '/views') ;
app.get('/' , function(req,res) {
    res.sendfile('views/index.html');
} );
app.get('/db/readRecords', function(req,res){
    dbOperations.getRecords(req,res);
});
app.get('/db/addRecord', function(req,res){
    dbOperations.addRecord(req,res);
});
app.get('/db/delRecord', function(req,res){
    dbOperations.delRecord(req,res);
});
app.get('/db/createTable', function(req,res){
    dbOperations.createTable(req,res);
});
app.get('/db/dropTable', function(req,res){
    dbOperations.dropTable(req,res);
}); 
app.set('port', process.env.PORT || 3001);
app.use(express.static(__dirname + '/client'));  
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
}); */