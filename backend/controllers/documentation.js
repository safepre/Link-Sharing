const router = require('express').Router()
const { marked } = require('marked')

const apiDocumentation = `
 * ### User Management
 * #### Create User
 * - **Endpoint:** \`/api/signup\`
 * - **Method:** \`POST\`
 * - **Request Parameters:**
 *   - email_address (email)
 *   - password (hashed)
 *   - confirmPassword (must be same exact password as above)
 * 
 * #### User Login
 * - **Endpoint:** \`/api/login\`
 * - **Method:** \`POST\`
 * - **Request Parameters:**
 *   - email_address (email)
 *   - password
 * - **Note:** Generates a jsonwebtoken that you can use in order to POST/PUT/DELETE Resources using bearer authorization.
 *
 * #### User Details
 * - **Endpoint:** \`/api/users\`
 * - **Methods:**
 *   - \`GET '/'\` (all users, excluding password hash and including profile)
 *   - \`GET '/:id'\` (specific user by ID, excluding password hash and including profile)
 * - **Note:** Two endpoints for retrieving user details.
 *
 * #### Update User
 * - **Endpoint:** \`/api/users/:id\`
 * - **Method:** \`PUT\`
 * - **Request Parameters:**
 *   - email_address (if you want to change your email_address)
 *
 * ### Profile Management
 * #### Create Profile
 * - **Endpoint:** \`/api/profiles\`
 * - **Authorization bearer required**
 * - **Method:** \`POST\`
 * - **Request Parameters:**
 *   - first_name (string): Name in the format Safelg (not safelg or sAfelg or an empty string)
 *   - last_name (string): Name in the format Foo (not foo or an empty string)
 *   - email (string): Must be a valid email address (not a random word without @)
 *
 * #### Update Profile
 * - **Endpoint:** \`/api/profiles/:id\`
 * - **Authorization bearer required**
 * - **Method:** \`PUT\`
 * - **Request Parameters:**
 *   - first_name (string): Updated first name 
 *   - last_name (string): Updated last name 
 *   - email (string): Updated email address 
 *  
 * ### Link Management
 * #### Get User Links
 * - **Endpoint:** \`/api/links\`
 * - **Methods:**
 *   - \`GET '/'\` (all links for the user)
 *   - \`GET '/:id'\` (individual link details for the user)
 *
 * #### Create Link
 * - **Endpoint:** \`/api/links\`
 * - **Authorization bearer required**
 * - **Method:** \`POST\`
 * - **Request Parameters:**
 *   - url (must be a valid URL)
 *   - platform (Git, Replit, Codewars, etc)
 *   - Date (automatically generated)
 *
 * #### Delete Link
 * - **Endpoint:** \`/api/links/:id\`
 * - **Authorization bearer required**
 * - **Method:** \`DELETE\` 
 *
 * #### Update Link
 * - **Endpoint:** \`/api/links/:id\`
 * - **Authorization bearer required**
 * - **Method:** \`PUT\`
 * - **Request Parameters:**
 * - url (must be a valid URL)
 * - platform (Git, Replit, Codewars, etc)
 *  
 * ### Image Handling
 * Make sure that Content-Type is multipart/form-data and body is form-data as well
 * #### Upload Photo
 * - **Endpoint:** \`/api/images/upload/\`
 * - **Authorization bearer required**
 * - **Method:** \`POST\`
 * 
 * #### Update Photo 
 * - **Endpoint:** \`/api/images/upload/\`
 * - **Authorization bearer required**
 * - **Method:** \`PUT\`
`

// Convert markdown to HTML
const htmlContent = marked.parse(apiDocumentation)

// Serve the HTML content
router.get('/', (req, res) => {
  res.send(htmlContent)
})

module.exports = router
