# api-auth

API with Authentication

Melisting berbagai users, terbagi menjadi admin dan user, menggunakan Authentication token untuk login.

List of Routes:

| Route          | HTTP   | Description
| -------------- | ------ | -----------
| /api/signup    | POST   | Sign up with new user info
| /api/signin    | POST   | Sign in while get an access token based on credentials
| /api/users     | GET    | Get all the users (ADMIN ONLY)
| /api/users/:id | GET    | Get single user (Admin and authenticated user)
| /api/users     | POST   | Create user (ADMIN ONLY)
| /api/users/:id | DELETE | Delete user (ADMIN ONLY)
| /api/users/:id | PUT    | Update a user with new info (Admin and authenticated user)

Usage:

```
npm install
npm install -g sqlite
sequelize db:migrate
npm start
```

Access:
http://localhost:3000/ OR https://fast-atoll-70338.herokuapp.com/
