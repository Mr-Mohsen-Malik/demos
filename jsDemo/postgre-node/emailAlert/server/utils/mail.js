var nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
var  now,currTime =new Date();
console.log("===>" ,currTime)

// exports.fun = function(name, email){

//    now = new Date();
// dateFormat.masks.hammerTime = 'HH:MM';
//  currTime = dateFormat(now, "hammerTime");
//  console.log(currTime);
// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: 'smtp.ethereal.email',
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'mohitsharma9109@gmail.com',
//     pass: 'aryan.mk.ter'
//   }
// });

// var mailOptions = {
//   from: 'mohitsharma9109@gmail.com',
//   to: email,
//   subject: 'Sending Email using Node.js',
//   text: 'Hi '+name+',\n This is alert massege at'+currTime
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error.message);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
// }

var fun = function(name, email){

   now = new Date();
dateFormat.masks.hammerTime = 'HH:MM';
 currTime = dateFormat(now, "hammerTime");
 console.log(currTime);
var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'mohitsharma9109@gmail.com',
    pass: 'aryan.mk.ter'
  }
});

var mailOptions = {
  from: 'mohitsharma9109@gmail.com',
  to: email,
  subject: 'Sending Email using Node.js',
  text: 'Hi '+name+',\n This is alert massege at'+currTime
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error.message);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

fun("mohsen", "mohsen.malik@wittybrains.com");