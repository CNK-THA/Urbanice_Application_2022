/**
 * Handle contact change in data file system.
 * Created: 15/07/22
 * Last Modified: 17/07/22
 * Editor: Chanon Kachornvuthidej, chanon.kachorn@gmail.com
 */

const fs = require('fs');
const getContactService = require('./getContacts.js');

/**
 * Check whether the requested change data existed or not (matching both Group and Name casesensitive).
 * If exist perform the update else return error.
 * 
 * @param {object} requestBody request body sent in POST request
 * @throws exception if data requested to change doesn't exist
 */
function editContact(requestBody) {
    dataObject = JSON.parse(getContactService.getContacts()); // parsed read JSON string to object

    if (dataObject[requestBody.group][requestBody.displayName] === undefined) {
        throw new Error("Data not found");
    }
    
    //perform update and re-write updated object to file
    dataObject[requestBody.group][requestBody.displayName] = requestBody.userData;
    fs.writeFile("./data/contacts.json", JSON.stringify(dataObject), function(err) {});
}

module.exports = {editContact}