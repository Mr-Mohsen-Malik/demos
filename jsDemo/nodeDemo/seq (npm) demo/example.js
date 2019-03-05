var http = require('http');
var fs = require('fs');
http.createServer(function(request, response) {
  response.writeHead(200, {
    'content-type': 'text/html'
  });
  response.write('<b>Hello</b> World<br/>');
  response.write('Type of request parameter = ' + typeof request);
  response.write('<br/>Request URL = ' + request.url);
 console.log( request.url != '/')
  // if (request.url != '/') {
  //   var q = request.query;
  //   var date = q.date + '&nbsp;' + q.month;
  //   response.write('<br/>Date = ' + date);
  //   var q2 = request.query;
  //   response.write('<br/>Date2 = ' + q2);

  // }

  fs.readFile('textFile.txt', function(err, data) {
    if (err)
      return console.error('<br/>' + err);
    response.write('<br/>' + data);
    response.end();
  });

   // response.end();
}).listen(8083);

console.log('Server running at localhost:8083');