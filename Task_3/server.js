/**
 * Simple tax calculation program based on personal income. - Task 3
 * 
 * Created: 15/07/22
 * Last Modified: 17/07/22
 * Editor: Chanon Kachornvuthidej, Chanon.kachorn@gmail.com
*/

var express = require('express');
var service = require(__dirname + '/services/calculateTax.js');
var app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());

// Begin API router
app.post('/calculateTax', function (req, res) {
   try{
      taxToPay = service.taxCalculation(req.body.netIncome);
      res.send({personalIncomeTax: taxToPay})
   } catch(err) {
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