const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const http = require('http')
const opn = require('opn')
const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];

// Get the keys
const  keyPath                       = {
  client_id: '540319340757-l7tu6rnuodgoke51cj9q9pbbetio2joq.apps.googleusercontent.com',
  client_secret: 'YmJg3KJnGvM-jXHFs_d1VSfN'
}
let keys = { redirect_uris: ['http://localhost:4000/'] };
// if (fs.existsSync(keyPath)) {
//   keys = Object.assign(keys, require(keyPath).web);
// }

function getAuthenticatedClient()        {
  return new Promise((resolve, reject) => {
    // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
    // which should be downloaded from the Google Developers Console.
    const oAuth2Client = new OAuth2Client(
      '540319340757-l7tu6rnuodgoke51cj9q9pbbetio2joq.apps.googleusercontent.com',
      'YmJg3KJnGvM-jXHFs_d1VSfN', "http://localhost:4000/"
      );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl =                  oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' ')
    });

    // Open an http server to accept the oauth callback. In this simple example, the
    // only request to our webserver is to /oauth2callback?code=<code>
    const server = http.createServer(async (req, res) => {
      if (req.url.indexOf('/') > -1) {
        // acquire the code from the querystring, and close the web server.
        const qs = querystring.parse(url.parse(req.url).query);
        console.log(`Code is ${qs.code}`);
        res.end('Authentication successful! Please return to the console.');
        server.close();

        // Now that we have the code, use that to acquire tokens.
        const r = await oAuth2Client.getToken(qs.code)
        // Make sure to set the credentials on the OAuth2 client.
        oAuth2Client.setCredentials(r.tokens);
        console.info('Tokens acquired.');
        resolve(oAuth2Client);
      }
    }).listen(4000, () => {
      opn(authorizeUrl);
    });
  });
}

async function main() {
  const oAuth2Client = await getAuthenticatedClient();

  const gmail = google.gmail({
    version: 'v1',
    auth: oAuth2Client
  });

  const res = await gmail.users.messages.list({ userId: 'me' });
  console.log(res);  // is undefined
};

main().catch(console.error);