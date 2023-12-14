const router = require('express').Router()
const { marked } = require('marked')

const apiDocumentation = `
 * ### User Management
 * #### Create User
 * - **Endpoint:** \`/api/signup\`
 * - **Method:** \`POST\`
 * - **Parameters:**
 *   - email_address (email)
 *   - password (hashed)
 *
 * #### User Login
 * - **Endpoint:** \`/api/login\`
 * - **Method:** \`POST\`
 * - **Parameters:**
 *   - email_address (email)
 *   - password
 * - **Note:** Generates a token stored in the session table to associate the user with created links.
 *
 * #### User Details
 * - **Endpoint:** \`/api/users\`
 * - **Methods:**
 *   - \`GET '/'\` (all users, excluding password hash and including user links)
 *   - \`GET '/:id'\` (specific user by ID, excluding password hash and including user links)
 * - **Note:** Two endpoints for retrieving user details.
 *
 * #### Update User
 * - **Endpoint:** \`/api/users/:id\`
 * - **Method:** \`PUT\`
 * - **Parameters:**
 *   - Username (new email/username)
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
 * - **Method:** \`POST\`
 * - **Parameters:**
 *   - Token (from user using bearer authorization)
 *   - url (must be a valid URL)
 *   - platform (Git, Replit, Codewars, etc)
 *   - Date (automatically generated)
 *
 * #### Delete Link
 * - **Endpoint:** \`/api/links/:id\`
 * - **Method:** \`DELETE\`
 * - **Parameters:**
 *   - Token (from the user)
 *   - Link ID (to delete)
 *
 * #### Update Link
 * - **Endpoint:** \`/api/links/:id\`
 * - **Method:** \`PUT\`
 * - **Parameters:**
 *  - Token (from the user)
 *  - Link ID (To Update)
 *  
 * ### Profile Management
 * #### Create Profile
 * - **Endpoint:** \`/api/profiles\`
 * - **Method:** \`POST\`
 * - **Parameters:**
 *   - Token (from user)
 *   - first_name (string): Name in the format Safelg (not safelg or sAfelg or an empty string)
 *   - last_name (string): Name in the format Foo (not foo or an empty string)
 *   - email (string): Must be a valid email address (not a random word without @)
 *
 * #### Update Profile
 * - **Endpoint:** \`/api/profiles/:id\`
 * - **Method:** \`PUT\`
 * - **Parameters:**
 *   - Token (from user)
 *   - first_name (string): Updated first name (optional)
 *   - last_name (string): Updated last name (optional)
 *   - email (string): Updated email address (optional)
 * 
 * ### Image Handling
 * #### Upload Photo
 * - **Endpoint:** \`/api/images/upload/\`
 * - **Method:** \`POST\`
 * - **Parameters:**
 *   - file_name (string): Original name of the uploaded file
 *   - content_type (string): MIME type of the file
 *   - image_data (buffer): Binary data of the image file
 *   - file_size (number): Size of the file in bytes
 *   - created_at (date): Date and time when the file was uploaded
 *   - updated_at (date): Date and time when the file was last updated
 * 
 * #### Update Photo (cannot be removed, refer to Figma design)
 * - **Endpoint:** \`/api/images/upload\`
 * - **Method:** \`PUT\`
 * - **Parameters:**
 *   - file_name (string): Original name of the uploaded file
 *   - content_type (string): MIME type of the file
 *   - image_data (buffer): Binary data of the image file
 *   - file_size (number): Size of the file in bytes
 *   - updated_at (date): Date and time when the file was last updated
`

// Convert markdown to HTML
const htmlContent = marked.parse(apiDocumentation)

// Serve the HTML content
router.get('/', (req, res) => {
  res.send(htmlContent)
})

module.exports = router
