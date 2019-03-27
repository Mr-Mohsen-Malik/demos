const sen = require("../utils/mail.js");
var schedule = require('node-schedule');
var dateFormat = require('dateformat');

var resp = {};

resp.allData = {};
resp.allData.data;
resp.res;
resp.req;
resp.pushResp = function(req, res, data){
    
    this.allData.data=data;
    this.res=res;
    this.req=req;
    resp.sendAlert(req, res, function(err, result){
        console.log('hello');
        if(err){
            console.log(err.message);
        }else{
            console.log("result-",result);
            resp.sendToHTML(result);
        }
    });
    
   
}

resp.sendAlert = function(req, res, callback){
    
    

    var data=this.allData.data;
    var res= this.res;
    var msg=[];
    
    var count=0;

        var j = schedule.scheduleJob(' * * * * * *', function(){
            now = new Date();
    dateFormat.masks.hammerTime = 'HH:MM';
    currTime = dateFormat(now, "hammerTime");
          msg.push('Hi '+data[count].name+', This is alert massege at '+now);
         //sen.fun(data[count].name, data[count].email);
         console.log('Hi '+data[count].name+', This is alert massege at '+now);
          count++;
         if(count == data.length){
            resp.allData.message = msg;
            callback(null, resp.allData);
         j.cancel();
         }
         console.log(count);

       });
 
         }

resp.sendToHTML = function(data){
    this.res.send(data);
    
}


module.exports = resp;