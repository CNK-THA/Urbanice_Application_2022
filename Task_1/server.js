/**
 * Provides an API to sending an email address to specified recipient
 * with Jwt token validation - Task 1.
 * 
 * NOTE: This app is also deployed to Heroku. Please find the provided postman
 * to test using the live cloud environment. 
 * 
 * Created: 15/07/22
 * Last Modified: 17/07/22
 * Editor: Chanon Kachornvuthidej, chanon.kachorn@gmail.com
 */

const service = require(__dirname + '/services/sendingEmail.js')
var express = require('express');
var { expressjwt: jwt} = require('express-jwt');
var jwks = require('jwks-rsa');
const dotenv = require('dotenv');
dotenv.config();

var app = express();
app.use(express.json());

// Perform a jwt token check for incoming POST request header with Auth0 server.
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTHENTICATION_DOMAIN
  }),

  // Validate the audience and the issuer.
  audience: process.env.API_IDENTIFIER,
  issuer: process.env.ISSUER,
  algorithms: ['RS256']
});
app.use(jwtCheck);

// Begin API router
app.post('/sendEmail', function (req, res) {
  try{
    service.checkParameters(req.body);
    service.sendEmail(req.body);
    res.send("Success");
  } catch(err){
    res.status(400);
    res.send(err.message);
    return;
  }    
  })

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Application running at http://%s:%s", host, port)
})