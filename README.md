# Urbanice_Application_2022

npm install express
npm i express-jwt jwks-rsa

Sets of test cases were conducted to verify the functionalities. Due to time constraints, only key features were analysed, the test cases were conducted via postman modifying the request body as appropriate. Some test cases were outside the scope of the task however is documented below for demonstration purpose.

Task 1:
- Implemented with Node.js
- SendInBlue service (note that there may be delays in email received due to Free plan)
- Jwt token authorisation with Auth0 (Note that for simplicity, Task 1 and 2 will share the same token)

| Task 1 - Test Cases | Result  |  |
| :---:   | :-: | :-: |
| No email sent with missing required parameter(s) in POST (from, to, message) | PASS |
| Extra parameter(s) | N/A
| Successful email sent with valid token used | PASS
| Incorrect email format | N/A
| Duplicate email from-to | N/A
| No email sent with invalid token used | PASS
| No email sent with no token used | PASS
| No email sent with incorrect Http request (i.e. GET) | PASS
| Successful email sent with valid parameters | PASS


Task 2:
- Implemented with Node.js
- To run locally
- JSON file is used as database mock up storing data. It is divided into 2 levels (case sensitive):
    - Groups
    - Contacts (Note that first name is considered the same as displayname)
- Implemented features: 
    - Add contacts: Must have a unique displayname(firstname)
    - Edit contacts: Modify/add contact details
    - List contacts: Retrieve all contacts in JSON format
    - Jwt token validation

- Further improvements: deletion of contacts, saving image (base64), additional contact parameters, contact ordering

| Task 2 - Test Cases | Result  |  |
| :---:   | :-: | :-: |
| Error message when file cannot be found (add/list/edit operations) | PASS |
| Error message for duplicate contact name when adding | PASS
| Error message for modifying contact name that doesn't exist | PASS
| Correctly add new contact with unique displayname and existing group | PASS
| Correctly add new contact with unique displayname and group | PASS
| Correctly modify existing contact | PASS
| Correctly remove existing contact | N/A
| Error message for removing contact that doesn't exist | N/A
| Error message for performing operations without valid token (add/list/edit) | PASS


Task 3:
- Implemented with Node.js
- To run locally
- Due to context of the task, no security implementation were required
- Further improvements: rounding of decimal numbers, additional error handling, input serialisation

| Task 3 - Test Cases | Result  |  |
| :---:   | :-: | :-: |
| Error message for inputs with characters | PASS |
| Error message for inputs as string | PASS
| Error message for inputs as negative values | PASS
| Correct Tax calculation for positive whole numbers | PASS
| Correct Tax calculation for positive decimal numbers | PASS
| Correct Tax calculation for each tax brackets | PASS
| Error message for missing inputs | PASS
| Error message for extra inputs | N/A
| Error message for incorrect HTTP request type (i.e GET) | PASS
