
var fs = require('fs')
 
fs.open('../src/urls.js', 'w+', function(err, fd) {
  if(err!==null){
      console.error(err);
      return; 
  }
  fs.write(fd, 'const DEV = false\r\n', 0, function(err, bytes) {
    if(err!==null){
      console.error(err);
      return; 
     }
  });
})

// var fun2 =()=>{console.log("hi")}
// var fun1 = () =>{
// 	for(var i =0 ; i<5 ; i++){
// 	 setTimeout(()=>{console.log("hello")},2000);
// n
// }}

// var promise = new Promise(function (resolve, reject) {
// 	try{
		
// 		 fun1(
// 		(()=> {return resolve}))
// 		}
// 	catch(e){ 

// 		reject(e)
// 	} 

//   });
// promise
// 	.then(()=> {
// 		fun2();
// 	})
// 	.catch((e)=>{ 
// 		console.log(e)
// 	})
	

 

