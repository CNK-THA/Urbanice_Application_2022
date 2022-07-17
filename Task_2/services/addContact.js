/**
 * Handle contact add in data file system.
 * Created: 15/07/22
 * Last Modified: 17/07/22
 * Editor: Chanon Kachornvuthidej, chanon.kachorn@gmail.com
 */

 const fs = require('fs');
 const getContactService = require(__dirname + '/getContacts.js');
 const filePath = "/../data/contacts.json";

/**
 * Check whether the requested data existed or not (matching both Group and Name case-sensitive).
 * If exist return error else proceed with addition.
 * 
 * @param {object} requestBody request body sent in POST request
 * @throws exception if data requested to change already existed
 */
function addContact(requestBody) {
    allDataObject = getContactService.getAllContacts(); // parsed read JSON string to object

    if (allDataObject[requestBody.group] !== undefined) {
        // If group exist check displayName (firstname) for duplicate
        if(allDataObject[requestBody.group][requestBody.displayName] !== undefined) {
            throw new Error("Data already exist");
        }
    } else { 
        // Attempting to add brand new group
        allDataObject[requestBody.group] = {};
    }
    
    allDataObject[requestBody.group][requestBody.displayName] = requestBody.userData;

    fs.writeFile(__dirname + filePath, JSON.stringify(allDataObject), function(err) {})
}

 module.exports = {addContact}