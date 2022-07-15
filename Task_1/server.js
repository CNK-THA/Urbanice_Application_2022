/**
 * Provides an API to sending an email address to specified recipient
 * with Jwt token validation - Task 1
 * 
 * Created: 15/07/22
 * Last Modified: 17/07/22
 * Editor: Chanon Kachornvuthidej, chanon.kachorn@gmail.com
 */
const CONFIG = require('./../config.json');
const service = require('./services/sendingEmail.js')
var express = require('express');
var { expressjwt: jwt} = require('express-jwt');
var jwks = require('jwks-rsa');

var app = express();
app.use(express.json());

// Perform a jwt token check for incoming POST request header with Auth0 server.
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: CONFIG.AUTHENTICATION_DOMAIN
  }),

  // Validate the audience and the issuer.
  audience: CONFIG.API_IDENTIFIER,
  issuer: CONFIG.ISSUER,
  algorithms: ['RS256']
});
app.use(jwtCheck);

app.post('/sendEmail', function (req, res) {
  try{
    service.checkParameters(req.body);
  } catch(err){
    res.status(400);
    res.send(err.message);
    return;
  }
  service.sendEmail(req.body);
  res.send("Success");
    
  })

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Application running at http://%s:%s", host, port)
})