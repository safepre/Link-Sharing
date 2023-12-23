const router = require('express').Router()
const { marked } = require('marked')

const apiDocumentation = `
 * ### User Management
 * #### Create User
 * - **Endpoint:** \`/api/signup\`
 * - **Method:** \`POST\`
 * - **Request Parameters:**
 *   - email_address (email) (Must be a valid email address (not a random word without @)
 *   - password (hashed)
 *   - confirmPassword 
 * 
 * #### User Login
 * - **Endpoint:** \`/api/login\`
 * - **Method:** \`POST\`
 * - **Request Parameters:**
 *   - email_address (email)
 *   - password (hashed)
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
 *   - email_address 
 *
 * ### Profile Management
 * #### Create Profile
 * - **Endpoint:** \`/api/profiles\`
 * - **Authorization bearer required**
 * - **Method:** \`POST\`
 * - **Request Parameters:**
 *   - first_name (Name in the format Safelg (not safelg or sAfelg or an empty string))
 *   - last_name (Name in the format Foo (not foo or an empty string))
 *   - email (Must be a valid email address (not a random word without @))
 *
 * #### Update Profile
 * - **Endpoint:** \`/api/profiles/:id\`
 * - **Authorization bearer required**
 * - **Method:** \`PUT\`
 * - **Request Parameters:**
 *   - first_name 
 *   - last_name
 *   - email (
 *  
 * #### Profile Details
 * - **Endpoint:** \`/api/users\`
 * - **Methods:**
 *   - \`GET '/'\` (all profiles, including image encoder and links)
 *   - \`GET '/:id'\` (specific profile by ID, including image encoder and links of the profile associated by user)
 * - **Note:** Two endpoints for retrieving profile details.
 *
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
 *   - platform 
 *  (PLATFORM MUST BE)
 *    'Github',
 *    'Frontend Mentor',
 *    'X',
 *    'Linkedin',
 *    'Youtube',
 *    'Facebook',
 *    'Twitch',
 *    'Dev.to',
 *    'Codewars',
 *    'Codepen',
 *    'freeCodeCamp',
 *    'LeetCode',
 *    'GitLab',
 *    'Hashnode',
 *    'Stack Overflow',
 *    'Khan Academy',             
 *    'Replit',
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
 *   - url 
 *   - platform 
 *  
 * ### Image Management
 * Make sure that Content-Type is multipart/form-data and body is form-data 
 * Also IMG must be PNG/JPEG, max size is up to 5MB
 * #### Upload Photo
 * - **Endpoint:** \`/api/images/upload/:profileId\`
 * - **Authorization bearer required**
 * - **Method:** \`POST\`
 * 
 * #### Update Photo 
 * - **Endpoint:** \`/api/images/upload/:profileId\`
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
