/**
 * Handles file open/reading of contents.
 * 
 * Created: 15/07/22
 * Last modified: 17/07/22
 * Editor: Chanon Kachornvuthidej, chanon.kachorn@gmail.com
 */

const fs = require('fs');
const filePath = "/../data/contacts.json";

/**
 * Helper function to read all data from specified JSON file.
 * 
 * @returns {object} key/value pair of all data stored
 */
function getAllContacts() {
    const data = fs.readFileSync(__dirname + filePath, 'utf8', 'r');
    return JSON.parse(data);
}

/**
 * Read groups data from file system with count of contacts in each group.
 * 
 * @returns data read from file
 */
function getGroups() {
    // produce an array of [[Group1, {Contact1, Contact2}], [Group2, {Contact3, Contact4}]]
    const allData = Object.entries(getAllContacts()); 
    const groupCounts = {};
    // Count how many contacts are in each group
    allData.forEach(function(item) {
        groupCounts[item[0]] = Object.keys(item[1]).length + " Contacts";   
    })
    return groupCounts;
}

/**
 * Return details of the contacts within the selected group.
 * 
 * @param {string} selectedGroup name of the group to retrieve contacts 
 * @returns {list} of string contacts
 * @Throws {Error} if selectedGroup doesn't exist
 */
function getContactsOfGroup(selectedGroup) {
    const data = getAllContacts()[selectedGroup];
    if(data == null) {
        throw new Error("No data found");
    }
    return data;
}

module.exports = {getGroups, getContactsOfGroup, getAllContacts}