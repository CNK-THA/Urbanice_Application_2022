var express = require('express');
var app = express();
const fs = require('fs');

app.use(express.json());

app.get('/listContacts', function (req, res) {
    console.log(req);
    fs.readFile( __dirname + "/" + "contacts.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
     });
    
    // res.send({personalIncomeTax: taxToPay})
  })

   // Firstname and key needs to match
app.post('/addContact', function(req, res) {
    fs.readFile( __dirname + "/" + "contacts.json", 'utf8', function (err, data) {
        data = JSON.parse( data );

        if (data[req.body.group][req.body.displayName] !== undefined) {
            res.end('{"status": 001, "description": "data already exist"}');
            return;
        }

        data[req.body.group][req.body.displayName] = req.body.userData;
        console.log("This is the data");
        console.log( data );

        fs.writeFile( __dirname + "/" + "contacts.json", JSON.stringify(data), function(err) {
            //if error what to do
        })
        res.end( JSON.stringify(data));
     });
})

//could support base64 image upload

app.post('/editContact', function(req, res) {
    fs.readFile( __dirname + "/" + "contacts.json", 'utf8', function (err, data) {
        data = JSON.parse( data );

        if (data[req.body.group][req.body.displayName] === undefined) {
            res.end('{"status": 001, "description": "data not found"}');
            return;
        }

        data[req.body.group][req.body.displayName] = req.body.userData;
        console.log("This is the data");
        console.log( data );

        fs.writeFile( __dirname + "/" + "contacts.json", JSON.stringify(data), function(err) {
            //if error what to do
        })
        res.end( JSON.stringify(data));
     });
})


  var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Application running at http://%s:%s", host, port)
 })