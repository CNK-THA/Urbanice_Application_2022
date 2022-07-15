/**
 * Simple tax calculation program based on personal income. - Task 3
 * 
 * Created: 15/07/22
 * Last Modified: 1/07/22
 * Editor: Chanon Kachornvuthidej, Chanon.kachorn@gmail.com
 */
var express = require('express');
var service = require('./services/calculateTax.js');
var app = express();

app.use(express.json());

app.post('/calculateTax', function (req, res) {
   var taxToPay;
   try{
      taxToPay = service.taxCalculation(req.body.netIncome);
   } catch(err) {
      res.status(400);
      res.send(err.message);
      return;
   }
   res.send({personalIncomeTax: taxToPay})
 })
 
 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Application running at http://%s:%s", host, port)
 })