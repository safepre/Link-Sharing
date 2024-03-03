
# Link Sharing

This is a Full Stack Project. The project is a link aggregator for developers! It utilizes Node, Express, and Postgres on the backend, Tailwind, CSS, and React.js on the frontend.

Running this Repo Locally

 Clone the repo to your machine, then run the development server:

```npm run dev```

Open http://localhost:5174 with your browser to see the result.
## Features

- User Authentication
- Add/Delete Links
-  Preview Aggregated Links
-    Add/Edit Profile Details
-   Responsive Design

## Details
### User Authentication

Implementing user authentication through Jsonwebtoken facilitates secure actions within the app. Users can create and delete links. The links are stored in a Postgres database. The links are validated server-side to ensure they are valid URLs.


### Add/Delete Links
Users can create and delete links, which will be rendered alongside for simultaneous viewing before previewing as a shared link.

### Preview Aggregated Links

The app provides a preview of aggregated links, utilizing server-side rendering for optimal performance. A dynamic, SSR'ed route is created for each user's links, facilitating easy sharing.

### Add/Edit Profile Details

Users can add and update their profile details, with image uploads handled separately.

### Responsive Design
The application is designed to be responsive across tablet and desktop devices, with mobile optimization in progress.
### Tech Stack
#### Postgresql
Postgresql serves as the backbone of the project, ensuring robust data storage and management.
#### Node.js
Node.js powers the server-side runtime, enabling efficient handling of requests and responses.
#### Express
Express handles routing within the application, integrating seamlessly with libraries like multer and Jsonwebtoken for enhanced functionality.
#### React.js
React.js drives the client-side interface, facilitating dynamic rendering and interaction with server-side endpoints.
#### CSS/Tailwind
 CSS, primarily implemented with Tailwind CSS, enhances the user interface design based on a pre-designed Figma template, with acknowledgment to collaborators for their contributions to the preview design.
