# api-auth

Demo app with basic REST API

List of user routes:

| Route         | HTTP  | Description
|-------------- |:------|-------------
| /api/users    | GET   | Get all the users
| /api/users/:id| GET   | Get a single user
| /api/users/   | POST  | Create a user
| /api/users/:id| DELETE| Delete a user
| /api/users/:id| PUT   | Update a user with new info
| /api/users/signin| POST| Sign in while get an access token based on credentials

Masukkan token pada header postman dengan key = auth, value = config.token_admin
