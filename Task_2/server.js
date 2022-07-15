/**
 * Simple database system of contact lists. Can perform basic get/add/update operations. - Task 2
 * Created: 15/07/22
 * Last Modified: 17/07/22
 * Editor: Chanon Kachornvuthidej, chanon.kachorn@gmail.com
 */
var express = require('express');
var app = express();
const getContactService = require('./services/getContacts.js');
const addContactService = require('./services/addContact.js');
const modifyContactService = require('./services/modifyContact.js');

app.use(express.json());

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

  var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Application running at http://%s:%s", host, port)
 })