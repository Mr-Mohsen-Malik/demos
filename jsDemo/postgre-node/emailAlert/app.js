var express = require('express');
var bodyParser=require('body-parser');
var emailAlert = require(process.cwd()+ "/server/modules/emailAlert.js");
var app=express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var routes  = require(process.cwd()+'/server/route/route.js');

app.use(express.static('client'));

app.use('/',routes);
const port = process.env.PORT || 5000;

app.listen(port, () => { 
 console.log('Node server listening on ', port);
});

module.exports=routes;