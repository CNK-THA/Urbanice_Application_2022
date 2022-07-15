//Alternatively can use Axios
const https = require('https');
const CONFIG = require('./../config.json');

var express = require('express');
var app = express();
app.use(express.json());


app.post('/sendEmail', function (req, res) {
    console.log(req.body);
    sendEmail(req.body);
    res.send()
  })

function sendEmail(requestData) {
  // console.log(requestData + "TTTTTTTTTTTT")
  const data = JSON.stringify({
    sender: {  
        // "name":requestData.from,
        "email":requestData.from
     },
     "to":[  
        {  
           "email":requestData.to,
          //  "name":requestData.to
        }
     ],
     "subject":"Test Message Task_1 Urbanice",
     "htmlContent": requestData.message
    //  "htmlContent":"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>"
});

console.log(data)

const options = {
  hostname: 'api.sendinblue.com',
  //   port: 443,
  path: '/v3/smtp/email',
  method: 'POST',
  headers: {
    'api-key':CONFIG.EMAIL_SERVICE_API_KEY,
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
}


var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Application running at http://%s:%s", host, port)
})