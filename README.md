# api-auth

# Information

Demo app dengan REST API Authentication

# Endpoints

| Route           | HTTP          | Description                                                     |
| :-------------- |:-------------:| :-------------------------------------------------------------- |
| /api/signup     | GET           | Sign up with new user info                                      |
| /api/signin     | GET           | Sign in while get an access token based on credentials          |
| /api/users      | GET           | Get all the users (admin only)                                  |
| /api/users/:id  | GET           | Get a single user (admin and authenticated user)                |
| /api/users      | POST          | Create a user (admin only)                                      |
| /api/users/:id  | DELETE        | Delete a user (admin and authenticated user)                    |
| /api/users/:id  | PUT           | Update a user with new info (admin and authenticated user)      |

# Usage

```
npm install -g sequelize-cli sequelize xpress-generator sqlite3 nodemon
npm start

```
# Access

```
Access the website via http://localhost:3000/api/users

```
