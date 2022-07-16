/**
 * Handle contact add in data file system.
 * Created: 15/07/22
 * Last Modified: 17/07/22
 * Editor: Chanon Kachornvuthidej, chanon.kachorn@gmail.com
 */

 const fs = require('fs');
 const getContactService = require(__dirname + '/getContacts.js');

/**
 * Check whether the requested data existed or not (matching both Group and Name case-sensitive).
 * If exist return error else proceed with addition.
 * 
 * @param {object} requestBody request body sent in POST request
 * @throws exception if data requested to change already existed
 */
function addContact(requestBody) {
    dataObject = JSON.parse(getContactService.getContacts()); // parsed read JSON string to object

    if (dataObject[requestBody.group] !== undefined) {
        // If group exist check displayName (firstname) for duplicate
        if(dataObject[requestBody.group][requestBody.displayName] !== undefined) {
            throw new Error("Data already exist");
        }
    } else { 
        // Attempting to add brand new group
        dataObject[requestBody.group] = {};
    }
    
    dataObject[requestBody.group][requestBody.displayName] = requestBody.userData;

    fs.writeFile(__dirname + "/../data/contacts.json", JSON.stringify(dataObject), function(err) {})
}

 module.exports = {addContact}