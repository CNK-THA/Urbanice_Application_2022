/**
 * Service file handling logic to send an email - Task 1
 * 
 * Created: 15/07/22
 * Last Modified: 17/07/22
 * Editor: Chanon Kachornvuthidej, chanon.kachorn@gmail.com
 */

const https = require('https');
const { request } = require('http');

/**
 * Invoke external POST API call to SendInBlue server to send email to recipient.
 * 
 * @param {object} requestData the request body object from POST 
 */
function sendEmail(requestData) {
    const data = JSON.stringify({
      sender: {  
          "email":requestData.from
       },
       "to":[  
          {  
             "email":requestData.to,
          }
       ],
       "subject":"Test Message Task_1 Urbanice",
       "htmlContent": requestData.message
  });

  // Manual http payload
  const options = {
    hostname: 'api.sendinblue.com',
    path: '/v3/smtp/email',
    method: 'POST',
    headers: {
      'api-key':process.env.EMAIL_SERVICE_API_KEY,
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };
  
  // Log the returned status code and any error message
  const req = https.request(options, res => { 
    res.on('data', d => {
      process.stdout.write(d);      
    });
  });
  
  req.write(data);
  req.end();
  }

/**
 * Check that all required parameters exist in the request body. (from, to, message)
 * 
 * @param {object} requestData the request body object from POST 
 * @throw Error if there is a missing parameter
 */
  function checkParameters(requestData) {
    if(!requestData.from || !requestData.to || !requestData.message) {
      throw new Error("Error, missing required parameters");
    }
  }

  module.exports = { sendEmail, checkParameters};