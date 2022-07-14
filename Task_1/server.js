//Alternatively can use Axios
const https = require('https');

const data = JSON.stringify({
    sender: {  
        "name":"Sender Alex",
        "email":"senderalex@example.com"
     },
     "to":[  
        {  
           "email":"chanon.kachorn@gmail.com",
           "name":"John Doe"
        }
     ],
     "subject":"Hello world",
     "htmlContent":"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>"
});

const options = {
  hostname: 'api.sendinblue.com',
//   port: 443,
  path: '/v3/smtp/email',
  method: 'POST',
  headers: {
    'api-key':<API_KEY_HERE>,
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



app.post('/sendEmail', function (req, res) {
    console.log(req.body);
    taxToPay = taxCalculation(req.body.netIncome);
    console.log("tax to pay" + taxToPay);
    res.send({personalIncomeTax: taxToPay})
  })