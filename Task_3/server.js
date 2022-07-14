var express = require('express');
var app = express();

app.use(express.json());

app.post('/calculateTax', function (req, res) {
   console.log(req.body);
   taxToPay = taxCalculation(req.body.netIncome);
   console.log("tax to pay" + taxToPay);
   res.send({personalIncomeTax: taxToPay})
 })
 
 function taxCalculation(netIncome) {
   if (typeof netIncome !== 'number' || netIncome < 0) {
      return "INVALID_ARGUMENT";
   } else if (netIncome <= 150000) {
      return 0;
   } else if (netIncome <= 300000) {
      return (netIncome - 150000) * 0.05;
   } else if (netIncome <= 500000) {
      return ((netIncome - 300000) * 0.1) + 7500;
   } else if (netIncome <= 750000) {
      return ((netIncome - 500000) * 0.15) + 27500;
   } else if (netIncome <= 1000000) {
      return ((netIncome - 750000) * 0.2) + 65000;
   } else if (netIncome <= 2000000) {
      return ((netIncome - 1000000) * 0.25) + 115000;
   } else if (netIncome <= 5000000) {
      return ((netIncome - 2000000) * 0.3) + 365000;
   } else {
      return ((netIncome - 5000000) * 0.35) + 1265000;
   }
 }
 
 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Application running at http://%s:%s", host, port)
 })