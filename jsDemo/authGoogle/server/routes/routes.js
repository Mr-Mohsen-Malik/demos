import logger from '../config/authGoogle';
import express from 'express';
 
const router = express.Router();

router.use('/',function(req,res){
////////////////////////////////////////////////
const credentials = {
    client: {
      id: '<client-id>',
      secret: '<client-secret>'
    },
    auth: {
      tokenHost: 'https://api.oauth.com'
    }
  };
   
  // Initialize the OAuth2 Library
  const oauth2 = require('simple-oauth2').create(credentials);

  // Authorization oauth2 URI
const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: 'http://localhost:4000/',
    scope: '<scope>', // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
    state: '<state>'
  });
   
  // Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
  res.redirect(authorizationUri);
   
  // Get the access token object (the authorization code is given from the previous step).
  const tokenConfig = {
    code: '<code>',
    redirect_uri: 'http://localhost:3000/callback',
    scope: '<scope>', // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
  };
   
  // Save the access token
  try {
    const result = oauth2.authorizationCode.getToken(tokenConfig)
    const accessToken = oauth2.accessToken.create(result);
  } catch (error) {
    console.log('Access Token Error', error.message);
  }
  const tokenObject = {
    'access_token': '<access-token>',
    'refresh_token': '<refresh-token>',
    'expires_in': '7200'
  };
   
  // Create the access token wrapper
  let accessToken = oauth2.accessToken.create(tokenObject);
   
  // Check if the token is expired. If expired it is refreshed.
  if (accessToken.expired()) {
    try {
      accessToken =  accessToken.refresh();
    } catch (error) {
      console.log('Error refreshing access token: ', error.message);
    }
  }
  const EXPIRATION_WINDOW_IN_SECONDS = 300;
 
const { token } = accessToken;
const expirationTimeInSeconds = token.expires_at.getTime() / 1000;
const expirationWindowStart = expirationTimeInSeconds - EXPIRATION_WINDOW_IN_SECONDS;
 
// If the start of the window has passed, refresh the token
const nowInSeconds = (new Date()).getTime() / 1000;
const shouldRefresh = nowInSeconds >= expirationWindowStart;
if (shouldRefresh) {
  try {
    accessToken =  accessToken.refresh();
  } catch (error) {
    console.log('Error refreshing access token: ', error.message);
  }
}

// Revoke both access and refresh tokens
try {
    // Revoke only the access token
     accessToken.revoke('access_token');
   
    // Session ended. But the refresh_token is still valid.
    // Revoke the refresh token
     accessToken.revoke('refresh_token');
  } catch (error) {
    console.log('Error revoking token: ', error.message);
  }

  try {
     oauth2.authorizationCode.getToken();
  } catch(error) {
    console.log(error);
  }
   
  // => {
  //     "statusCode": 401,
  //     "error": "Unauthorized",
  //     "message": "invalid password"
  // }
  /////////////////////////////////////////////////////////////
})



module.exports = router;