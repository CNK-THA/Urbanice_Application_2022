/**
 * Simple database system of contact lists. Can perform basic get/add/update operations. - Task 2
 * Created: 15/07/22
 * Last Modified: 17/07/22
 * Editor: Chanon Kachornvuthidej, chanon.kachorn@gmail.com
 */
var express = require('express');
var app = express();
const getContactService = require(__dirname + '/services/getContacts.js');
const addContactService = require(__dirname + '/services/addContact.js');
const modifyContactService = require(__dirname + '/services/modifyContact.js');
var { expressjwt: jwt} = require('express-jwt');
var jwks = require('jwks-rsa');
const dotenv = require('dotenv');
dotenv.config();

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

app.get('/listContacts', function (req, res) {
    var data;
    try{
        data = getContactService.getContacts();
    } catch(err){
        res.status(500);
        res.send(err.message);
        return;
    }
    res.send(data);
  })

app.post('/addContact', function(req, res) {
    try{
        addContactService.addContact(req.body);
    } catch(err) {
        res.status(500);
        res.send(err.message);
        return;
    }
    res.send("SUCCESS");
})

app.post('/editContact', function(req, res) {
    try{
        modifyContactService.editContact(req.body);
    } catch(err) {
        res.status(500);
        res.send(err.message);
        return;
    }
    res.send("SUCCESS");
})

  var server = app.listen(process.env.PORT, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Application running at http://%s:%s", host, port)
 })