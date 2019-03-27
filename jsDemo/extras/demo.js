
const config = {

  id: '540319340757-l7tu6rnuodgoke51cj9q9pbbetio2joq.apps.googleusercontent.com',
  secret: 'YmJg3KJnGvM-jXHFs_d1VSfN'
}

goauth2 = require("google-oauth2")(config)
const tokenConfig = {
  username: 'mohitsharma9109@gmail.com',
  password: 'aryan.mk.teri',
  scope: 'https://www.googleapis.com/auth/userinfo.profile' // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
};
scope = "https://www.googleapis.com/auth/userinfo.profile"

var auth_code = goauth2.getAuthCode(scope, (err, auth_code) => {
  console.log(auth_code);
  return auth_code;
})
goauth2.getTokensForAuthCode(auth_code, (err, result) => {
  if (err)
    console.log(err)
  console.log(result.access_token);
  console.log(result.refresh_token);
})