const router = require('express').Router()
const { marked } = require('marked')

const apiDocumentation = `
 * ### User Management
 *
 * #### Create User
 * - **Endpoint:** \`/api/signup\`
 * - **Method:** \`POST\`
 * - **Parameters:**
 *   - name
 *   - username (email)
 *   - password (hashed)
 *
 * #### User Login
 * - **Endpoint:** \`/api/login\`
 * - **Method:** \`POST\`
 * - **Parameters:**
 *   - username (email)
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
 *
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
 *   - URL (must be a valid URL)
 *   - Name of the link
 *   - Description (optional)
 *   - Date (automatically generated)
 *
 * #### Delete Link
 * - **Endpoint:** \`/api/links/:id\`
 * - **Method:** \`DELETE\`
 * - **Parameters:**
 *   - Token (from the user)
 *   - Link ID (to delete)
 *
 * ### Image Management
 *
 * #### Upload Image
 * - **Endpoint:** \`/api/images/upload\`
 * - **Method:** \`POST\`
 * - **Parameters:**
 *   - Image
 *   - Token (from user)
 * - **Note:** Checks if the image is in PNG or JPEG format.
 *
 * ### User Logout
 *
 * #### Logout
 * - **Endpoint:** \`/api/logout\`
 * - **Method:** \`POST\`
 * - **Note:** Removes the session (token stored in the DB) for the user.`

// Convert markdown to HTML
const htmlContent = marked.parse(apiDocumentation)

// Serve the HTML content
router.get('/', (req, res) => {
  res.send(htmlContent)
})

module.exports = router
