import express from 'express';
import bodyParser from 'body-parser';
// import routes from './server/routes/routes';
import logger from './server/config/authGoogle';

const app = express();
const port = process.env.PORT || 4000;
///////////////////////////////////////////////////////
const credentials = {
    client: {
      id: '540319340757-l7tu6rnuodgoke51cj9q9pbbetio2joq.apps.googleusercontent.com',
      secret: 'YmJg3KJnGvM-jXHFs_d1VSfN'
    },
    auth: {
      tokenHost: 'https://www.googleapis.com'
    }
  };
   
  // Initialize the OAuth2 Library
  // const oauth2 = require('simple-oauth2').create(credentials);
  import oauth2    from 'simple-oauth2';
  oauth2.create(credentials);
  
  // Get the access token object.
  const tokenConfig = {
    username: 'mohitsharma9109@gmail.com',
    password: 'aryan.mk.teri',
     // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
  };
   
  // Save the access token
  try {
      
  
    const result =  oauth2.ownerPassword.getToken(tokenConfig);
    const accessToken = oauth2.accessToken.create(result);
  } catch (error) {
    console.log('Access Token Error', error.message);
  }
  
  ///////////////////////////////////////////////




app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// app.use('/',routes);
app.listen(port, () => {
    logger.info({message:'Node server listening on '+port});
});

module.exports = app;