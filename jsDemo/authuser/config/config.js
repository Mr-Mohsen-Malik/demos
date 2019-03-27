let config ={};

config.secret = {

  'secret'    : 'supersecret',
  'someSecret':'smallsecret'

};
config.noti = {

  pass    : 'password has been changed',
  profile : 'profile has been updated',
  userType: 'UserType has been changed',
  delete  : 'account has been deleted',
  create  : 'account has been created'

}

config.recordsPerPage = {length: 3};

config.mailerOptions ={

  service : 'gmail',
  host    : 'smtp.ethereal.email',
  port    : 587,
  secure  : false,
  auth    : {
            user: '<Email-ID>',  //userId odf sender
            pass: '<Password>'   //Password of sender
        }

}
config.sender = '<Email-ID>';  //emailid of sender

module.exports = config;