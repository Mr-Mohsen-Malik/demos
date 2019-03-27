let config = {};

config.secret = {

  'secret': 'supersecret',
  'someSecret': 'smallsecret'

};

config.conStr = {
  "connectionString": "mongodb://localhost/node-mongo-registration-login-api",

}

config.noti = {

  pass: 'password has been changed',
  profile: 'profile has been updated',
  userType: 'UserType has been changed',
  delete: 'account has been deleted',
  create: 'account has been created'

}

config.schema = {
  name: String,
  email: String,
  password: String,
  active: Boolean,
  token: String,
}

config.db = {
  url: 'mongodb://localhost:27017',
  name: 'wittybrains',
  colName: 'users'
}

config.mailerOptions = {

  service: 'gmail',
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: '<Email-ID>',  //userId odf sender
    pass: '<Password>'   //Password of sender
  }

}
config.sender = '<Email-ID>';  //emailid of sender

module.exports = config;