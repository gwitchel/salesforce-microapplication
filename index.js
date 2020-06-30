const requests = require('./requests.js')
const express = require('express')
const app = express()
var request = require('request');
var sf = require('node-salesforce');




var oauth2 = new sf.OAuth2({
    // you can change loginUrl to connect to sandbox or prerelease env.
    clientId : '3MVG9Kip4IKAZQEVpPmAointpLLPvhuSwUeLk0nOgkGsGTLTuYiaJ45rN6vEEMJuOHiTMANkJKFjXV1Fwbh3U',
    clientSecret : 'A9603C85AB68302A8B3BCDF6AC610D8F8AFD3B70876CE6C0D3E319954A7991CF',
    redirectUri : 'http://localhost:8080/oauth2/callback'
  });
  //
  // Get authz url and redirect to it.
  //
  app.get('/oauth2/auth', function(req, res) {
    res.redirect(oauth2.getAuthorizationUrl({ scope : 'api id web' }));
  });
  app.get('/oauth2/callback', function(req, res) {
    var conn = new sf.Connection({ oauth2 : oauth2 });
    var code = req.param('code');
    conn.authorize(code, function(err, userInfo) {
      if (err) { return console.error(err); }
      // Now you can get the access token, refresh token, and instance URL information.
      // Save them to establish connection next time.
      console.log(err)
      console.log("access token", conn.accessToken);
      console.log(conn.refreshToken);
      console.log(conn.instanceUrl);
      console.log("User ID: " + userInfo.id);
      console.log("Org ID: " + userInfo.organizationId);
      // ...
    });
  });
  app.get('/success', function(req, res) {
    var conn = new sf.Connection({ oauth2 : oauth2 });
    var code = req.param('code');
    conn.authorize(code, function(err, userInfo) {
      if (err) { return console.error(err); }
      // Now you can get the access token, refresh token, and instance URL information.
      // Save them to establish connection next time.
      console.log(conn.accessToken);
      console.log(conn.refreshToken);
      console.log(conn.instanceUrl);
      console.log("User ID: " + userInfo.id);
      console.log("Org ID: " + userInfo.organizationId);
      // ...
    });
  });


app.listen(8080, function () {
  console.log('Example app listening on port 8080.');
});
