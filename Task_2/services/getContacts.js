/**
 * Handles file open/reading of contents.
 * 
 * Created: 15/07/22
 * Last modified: 17/07/22
 * Editor: Chanon Kachornvuthidej, chanon.kachorn@gmail.com
 */

const fs = require('fs');

/**
 * Read data from file system.
 * 
 * @returns data read from file
 */
function getContacts() {
    const data = fs.readFileSync("./data/contacts.json", 'utf8', 'r');
    return data;
}

module.exports = {getContacts}