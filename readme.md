### Social API Application

This is a RESTful API for a social networking application where users can perform various actions such as authentication, creating posts, and managing their social connections by following and unfollowing other users.

The API provides endpoints for:

- User Authentication: Users can register for a new account or log in to an existing account.
- Post Management: Users can create new posts, view posts, update their own posts, and delete their own posts.
- Social Interaction: Users can follow other users to see their posts in their feed and unfollow users to remove them from their feed.

This API is designed to facilitate the development of social networking applications, providing essential features for user engagement and interaction. It utilizes JSON Web Tokens (JWT) for user authentication and authorization, ensuring secure access to resources. The MongoDB database is used for data storage, providing scalability and flexibility for managing user data and posts.

## API Documentation

### Endpoints

#### User Routes: `/api/v1/user`

- **POST /register**

  - Register a new user.
  - Request body should contain username, email, and password.
  - Returns the newly registered user's details.

- **POST /login**

  - Authenticate user and generate JWT token.
  - Request body should contain email and password.
  - Returns JWT token upon successful authentication.

- **GET /posts**

  - Get all posts created by the authenticated user.
  - Requires JWT token in the Authorization header.
  - Returns an array of posts created by the user.

- **GET /followers**

  - Get a list of followers for the authenticated user.
  - Requires JWT token in the Authorization header.
  - Returns an array of follower details.

- **GET /followings**

  - Get a list of users followed by the authenticated user.
  - Requires JWT token in the Authorization header.
  - Returns an array of user details followed by the authenticated user.

- **GET /feed**

  - Get a feed of posts from followed users.
  - Requires JWT token in the Authorization header.
  - Returns an array of posts from followed users.

- **POST /updateProfile**
  - Update the profile information of the authenticated user.
  - Requires JWT token in the Authorization header.
  - Request body should contain updated profile information.
  - Returns the updated user profile.

#### Post Routes: `/api/v1/post`

- **GET /**

  - Get all posts.
  - Returns an array of all posts.

- **POST /**

  - Create a new post.
  - Requires JWT token in the Authorization header.
  - Request body should contain post details.
  - Returns the newly created post.

- **GET /:id**

  - Get details of a specific post by its ID.
  - Returns details of the post.

- **DELETE /:id**

  - Delete a specific post by its ID.
  - Requires JWT token in the Authorization header.
  - Returns a success message upon deletion.

- **PUT /:id**
  - Update a specific post by its ID.
  - Requires JWT token in the Authorization header.
  - Request body should contain updated post details.
  - Returns the updated post.

#### Follow Routes: `/api/v1/follow`

- **GET /:id**

  - Follow a user by their ID.
  - Requires JWT token in the Authorization header.
  - Returns a success message upon following.

- **GET /unfollow/:id**
  - Unfollow a user by their ID.
  - Requires JWT token in the Authorization header.
  - Returns a success message upon unfollowing.

### Environment Variables & Setup

To run this application locally, you must have MongoDb locally or you can use MONGO ATLAS and you will need to set up the following environment variables in a `.env` file:

- `MONGODB_URL`: URL for MongoDB database connection.
- `JWT_SECRET`: Secret key for JWT token generation and verification.

Make sure to replace placeholders like `:id` with actual user or post IDs in your requests.

First clone this project and run `pnpm i` to install all dependencies.

You can start the application by running `npm start`. Make sure MongoDB is running and accessible.
